"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPass = exports.login = exports.getHome = exports.saveUser = void 0;

var _typeorm = require("typeorm");

var _User = require("../entity/User");

var nodemailer = _interopRequireWildcard(require("nodemailer"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var crypto = _interopRequireWildcard(require("crypto"));

var bcrypt = _interopRequireWildcard(require("bcrypt"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const saveUser = async (req, res) => {
  const {
    nome,
    email,
    senha,
    senha_confirmacao
  } = req.body;

  if (senha !== senha_confirmacao) {
    return res.status(404).json({
      message: "erro senhas diferentes"
    });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 8);
    const user = await (0, _typeorm.getRepository)(_User.User).save({
      nome,
      email,
      senha: senhaHash
    });
    const token_register = jwt.sign({
      nome
    }, process.env.SECRET, {
      expiresIn: '1d'
    });
    const data = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: token_register
    };
    return res.status(201).json(data);
  } catch (error) {
    return res.status(402).json({
      message: "erro user controller"
    });
  }
};

exports.saveUser = saveUser;

const getHome = async (req, res) => {
  const id = req.params.id;
  const user = await (0, _typeorm.getRepository)(_User.User).findOne({
    select: ['id', 'nome', 'email'],
    where: {
      id
    }
  });
  return res.json(user);
};

exports.getHome = getHome;

const login = async (req, res) => {
  const {
    email,
    senha
  } = req.body;

  try {
    const user = await (0, _typeorm.getRepository)(_User.User).find({
      where: {
        email
      }
    });

    if (await bcrypt.compare(senha, user[0].senha)) {
      const token_login = jwt.sign({
        email
      }, process.env.SECRET, {
        expiresIn: '1d'
      });
      const data = {
        id: user[0].id,
        nome: user[0].nome,
        email: user[0].email,
        token: token_login
      };
      return res.json(data);
    } else {
      return res.status(404).json({
        messge: "erro no login controler"
      });
    }
  } catch (err) {
    return res.status(402).json({
      message: "erro user controller"
    });
  }
};

exports.login = login;

const forgotPass = async (req, res) => {
  const {
    email
  } = req.body;
  const user = await (0, _typeorm.getRepository)(_User.User).findOne({
    where: {
      email
    }
  });
  const transporte = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });
  const novaSenha = crypto.randomBytes(4).toString('hex');
  await transporte.sendMail({
    from: 'administrador <dc1d1eeef9-eb0505@inbox.mailtrap.io>',
    to: email,
    subject: "recuperação de senha",
    html: `<p>óla, sua nova senha para acessar o sistema: ${novaSenha} </p><br /><a href="localhost:3333/session">sistema</a>`
  });
  const senha_final = await bcrypt.hash(novaSenha, 8);
  await (0, _typeorm.getConnection)().createQueryBuilder().update(_User.User).set({
    senha: senha_final
  }).where({
    id: user.id
  }).execute();
  return res.json({
    message: 'senha criada e enviado para o mailtrap'
  });
};

exports.forgotPass = forgotPass;
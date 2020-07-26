"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _cors = _interopRequireDefault(require("cors"));

var _AccountController = require("./controller/AccountController");

var _auth = require("./middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)(); //opçoes para cors midddleware

const options = {
  allowedHeaders: ["Origin", "Content-Type", "Authorization"],
  credentials: true,
  methods: "GET,OPTIONS,PATCH,POST",
  origin: ["*", "https://infallible-wright-a8d49d.netlify.app", "https://infallible-wright-a8d49d.netlify.app/", "https://infallible-wright-a8d49d.netlify.app/login", "https://infallible-wright-a8d49d.netlify.app/home", "https://infallible-wright-a8d49d.netlify.app/home/"],
  preflightContinue: true
}; //use cors middleware

routes.use((0, _cors.default)(options));
routes.get('/', (request, response) => {
  return response.json({
    message: "PRONTO CARALHOOOOO !"
  });
});
routes.post('/saveUser', _AccountController.saveUser);
routes.post('/session', _AccountController.login);
routes.post('/forgot', _AccountController.forgotPass); //middleware autenticacao

routes.use(_auth.auth);
routes.get('/home/:id', _AccountController.getHome);
var _default = routes;
exports.default = _default;
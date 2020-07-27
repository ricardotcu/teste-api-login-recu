import { getConnection, getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export const saveUser = async (req: Request, res: Response) => {
    const { nome, email, senha, senha_confirmacao } = req.body;

    if(senha !== senha_confirmacao){
        return res.status(404).json({message: "erro senhas diferentes"})
    }
    
    try {
        const senhaHash = await bcrypt.hash(senha, 8);
        
        const user = await getRepository(User).save({
            nome,
            email,
            senha: senhaHash
        });
        
        const token_register = jwt.sign({ nome }, process.env.SECRET, {
            expiresIn: '1d'
        });

        const data = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token: token_register
        }
        
        return res.status(201).json(data);

    } catch (error) {
        return res.status(402).json({message: "erro user controller"})
    }
}

export const getHome = async (req: Request, res: Response) => {
    const id  = req.params.id;
   
    const user = await getRepository(User).findOne({
        select: ['id', 'nome', 'email'],
        where: {
            id
        }
    });

    return res.json(user);

}

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const user = await getRepository(User).find({
            where: {
                email
            }
        });

        if (await bcrypt.compare(senha, user[0].senha)) {

            const token_login = jwt.sign({ email }, process.env.SECRET, {
                expiresIn: '1d'
            });

            const data = {
                id: user[0].id,
                nome: user[0].nome,
                email: user[0].email,
                token: token_login
            }
            
            return res.json(data);
        } else {
            return res.status(404).json({messge: "erro no login controler"})
        }

    } catch (err) {
        return res.status(402).json({message: "erro user controller"})
    }
}

export const forgotPass = async (req: Request, res: Response) => {
    const { email } = req.body;
    
    const user = await getRepository(User).findOne({
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
    
    await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ senha: senha_final })
    .where({ id: user.id })
    .execute();

    return res.json({message: 'senha criada e enviado para o mailtrap'})
}
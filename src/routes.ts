import { Router, Request, Response } from 'express';
import cors from 'cors'
import { getHome, saveUser, login, forgotPass } from './controller/AccountController'

import { auth } from './middlewares/auth';

const routes = Router();

//opçoes para cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
        "Origin",
        "Content-Type",
        "Authorization"
    ],
    credentials: true,
    methods: "GET,OPTIONS,PATCH,POST",
    origin: [
        "https://infallible-wright-a8d49d.netlify.app/login",
        "https://infallible-wright-a8d49d.netlify.app/home"
    ],
    preflightContinue: false
};
routes.options("*", cors(options));

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

routes.post('/saveUser', saveUser);
routes.post('/session', login);
routes.post('/forgot', forgotPass);

//middleware autenticacao
routes.use(auth);

routes.get('/home/:id', getHome);

export default routes;
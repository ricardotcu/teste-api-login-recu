import { Router, Request, Response } from 'express';
import { getHome, saveUser, login, forgotPass } from './controller/AccountController'

import cors from 'cors'
import { auth } from './middlewares/auth';

const routes = Router();

routes.use(cors());

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
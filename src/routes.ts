import { Router, Request, Response } from 'express';
import { getHome, saveUser, login, forgotPass } from './controller/AccountController'

import { auth } from './middlewares/auth';

const routes = Router();


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
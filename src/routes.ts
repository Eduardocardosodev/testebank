import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { AuthMiddlewares } from './middlewares/auth';
import { sendEmail } from './middlewares/sendEmail';
import { userFormValidator } from './middlewares/validation';

const routes = Router();

const user = new UserController();

routes.post('/register', userFormValidator, sendEmail, user.create);
routes.post('/login', AuthMiddlewares, user.login);
routes.get('/getAllUser', user.index);
routes.get('/getAllUser/:id', user.getUserById);
routes.delete('/deleteUser/:id', user.delete);
routes.get('/search', user.search);

export default routes;

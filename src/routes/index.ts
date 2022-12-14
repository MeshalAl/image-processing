import { Router, Request, Response } from 'express';
import apiRoute from './api/api';

const routes = Router();

routes.get('/', (req: Request, res: Response): void => {
    res.status(200).send('base route');
});

routes.use('/api', apiRoute);

routes.use('*', (req: Request, res: Response): void => {
    res.status(404).send('<h1> 404: page not found </h1>');
});
export default routes;

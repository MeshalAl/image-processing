import { Router, Request, Response } from 'express';
import imagesRoute from './imagesRoute';

const routes = Router();

routes.get('/', (req: Request, res: Response): void => {
    res.status(200).send('api route');
});

routes.use('/images', imagesRoute);

routes.use('*', (req: Request, res: Response): void => {
    res.status(404).send('<h1> 404: page not found </h1>');
});

export default routes;

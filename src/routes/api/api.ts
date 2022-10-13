import { Router, Request, Response } from 'express';
import imagesRoute from './imagesRoute';

const routes = Router();

routes.get('/', (req, res) => {
    res.send('api route');
});

routes.use('/images', imagesRoute);

routes.use('*', (req: Request, res: Response) => {
    res.status(404);
    res.send('<h1> 404: page not found </h1>');
});

export default routes;

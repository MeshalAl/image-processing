import { Router, Request, Response } from 'express';
import {
    validateFileName,
    validateImageExists,
} from '../../middleware/validators';
import resize from '../../utilities/sharpUtil';

const routes = Router();

routes.get(
    '/',
    validateFileName,
    validateImageExists,
    (req: Request, res: Response) => {
        const resizedPath = resize(req);
        try {
            res.status(200).sendFile(resizedPath);
        } catch (error) {
            console.log('failed locating the resized image');
        }
    }
);

export default routes;

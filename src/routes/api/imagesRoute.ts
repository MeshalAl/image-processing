import { Router, Request, Response } from 'express';
import {
    validateParameters,
    validateImageExists,
} from '../../middleware/validators';
import resize from '../../utilities/sharpUtil';

const routes = Router();

routes.get(
    '/',
    validateParameters,
    validateImageExists,
    async (req: Request, res: Response) => {
        const resizedPath = await resize(req);
        try {
            res.status(200).sendFile(resizedPath);
        } catch (error) {
            console.log('failed locating the resized image');
        }
    }
);

export default routes;

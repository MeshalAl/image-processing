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
        const filename = req.query.filename as string;
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);

        const resizedPath = await resize(filename, width, height);
        try {
            res.status(200).sendFile(resizedPath);
        } catch (error) {
            console.log('failed locating the resized image');
        }
    }
);

export default routes;

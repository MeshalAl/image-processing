import { Router, Request, Response, NextFunction } from 'express';
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
    async (req: Request, res: Response, next: NextFunction) => {
        const filename = req.query.filename as string;
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);

        try {
            const resizedPath = await resize(filename, width, height);
            res.status(200).sendFile(resizedPath);
        } catch (err) {
            console.log(`failed locating the resized image\n${err}`);
            next();
        }
    }
);

export default routes;

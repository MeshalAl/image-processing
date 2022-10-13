/*
validate list:
1. parameters are correct.
2. file exists in full-images.
3. file exists in thumb-images.
4. params are not empty.
*/
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

const validateFileName = (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.query;
    if (typeof filename != 'undefined' && !filename)
        return res.status(404).send('filename is empty');
    else if (typeof filename == 'undefined')
        return res.status(404).send('Add filename=x');
    next();
};

const validateImageExists = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { filename } = req.query;

    const imagePath = path.join(__dirname, '../../images/');
    const inputPath = path.join(imagePath, 'input/', `${filename}.jpg`);

    if (fs.existsSync(inputPath)) {
        const { width, height } = req.query;
        const outputPath = path.join(
            imagePath,
            'output/',
            `${filename}-${width}x${height}.jpg`
        );

        if (!fs.existsSync(outputPath)) next();

        return res.status(200).sendFile(outputPath);
    }

    return res.status(404).send('image not found');
};

export { validateImageExists, validateFileName };

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
import { imagePath } from '../data_paths/imagePaths';

const validateParameters = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    // imageRoute and query structure: images?filename=[string]&width=[string]&height=[string]

    const fileName = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    const iterator = {
        fileName,
        width,
        height,
    };

    try {
        if (Object.keys(req.query).length === 0) {
            return res.status(200).send('200: image route');
        }
        // check if there are more than 3 parameters
        if (Object.keys(req.query).length > 3) {
            return res.status(404).send(`404: parameters beyond 3`);
        }
        for (const [key, value] of Object.entries(iterator)) {
            if (typeof value == 'undefined')
                return res.status(404).send(`404: params ${key} missing`);
            else if (key != 'filename' && isNaN(Number(value)))
                return res
                    .status(404)
                    .send(`404: param ${key} has a non-numerical value.`);
            else if (!value)
                return res.status(404).send(`404: param ${key} is empty`);
        }
        if (width <= 0 || height <= 0) {
            return res
                .status(404)
                .send('404: Width or height cannot be lower than 1.');
        }
        return next();
    } catch (e: unknown) {
        throw new Error('Error on parameter validation');
    }
};

const validateImageExists = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    try {
        const { filename } = req.query;

        const inputPath = path.join(imagePath, 'input/', `${filename}.jpg`);
        // check if there is an input image, if none show error.
        if (fs.existsSync(inputPath)) {
            const { width, height } = req.query;
            const outputPath = path.join(
                imagePath,
                'output/',
                `${filename}-${width}x${height}.jpg`
            );
            // check if there is an output with same file and dimensions, if true return it.
            if (fs.existsSync(outputPath))
                return res.status(200).sendFile(outputPath);
            else return next();
        } else return res.status(404).send('image not found');
    } catch (e: unknown) {
        throw new Error('Error on validating existance of image');
    }
};

export { validateImageExists, validateParameters };

import sharp from 'sharp';
import { Request } from 'express';
import path from 'path';

const resize = (req: Request): string => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const imagePath = path.join(__dirname, '../../images/');
    const inputPath = path.join(imagePath, 'input/', `${filename}.jpg`);
    const outputPath = path.join(
        imagePath,
        'output/',
        `${filename}-${width}x${height}.jpg`
    );

    try {
        sharp(inputPath).resize(width, height).toFile(outputPath).then();
    } catch (err) {
        throw new Error('Error on resizing');
    }
    return outputPath;
};

export default resize;

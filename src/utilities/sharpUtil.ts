import sharp from 'sharp';
import { Request } from 'express';
import path from 'path';
import { imagePath } from '../data_paths/imagePaths';

const resize = async (req: Request) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const inputPath = path.join(imagePath, 'input/', `${filename}.jpg`);
    const outputPath = path.join(
        imagePath,
        'output/',
        `${filename}-${width}x${height}.jpg`
    );

    try {
        const sharpedImage = sharp(inputPath);
        const resizedImage = sharpedImage.resize(width, height);
        await resizedImage.toFile(outputPath).then((info) => {
            console.log(
                `image generated: ${filename}-${width}x${height}.jpg \nat ${outputPath}\n ${JSON.stringify(
                    info
                )}`
            );
        });

        return outputPath;
    } catch (error) {
        throw new Error('Resizing failed');
    }
};

export default resize;

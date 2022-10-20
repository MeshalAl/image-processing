import sharp from 'sharp';
import { Request } from 'express';
import path from 'path';
import { imagePath } from '../data_paths/imagePaths';

const resize = async (
    fileName: string,
    fileWidth: number,
    fileHeight: number
): Promise<string> => {
    if (fileWidth <= 0 || fileHeight <= 0) {
        throw new Error('FileWidth or fileHeight cannot be lower than 1.');
    }

    const inputPath = path.join(imagePath, 'input/', `${fileName}.jpg`);
    const outputPath = path.join(
        imagePath,
        'output/',
        `${fileName}-${fileWidth}x${fileHeight}.jpg`
    );

    try {
        const sharpedImage = sharp(inputPath);
        const resizedImage = sharpedImage.resize(fileWidth, fileHeight);
        await resizedImage.toFile(outputPath).then((info) => {
            console.log(
                `image generated: ${fileName}-${fileWidth}x${fileHeight}.jpg \n\nat ${outputPath}\n ${JSON.stringify(
                    info
                )}\n\n`
            );
        });

        return outputPath;
    } catch (error) {
        throw new Error('Resizing failed');
    }
};

export default resize;

import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';
import resize from '../../utilities/sharpUtil';
import { doesNotMatch } from 'assert';

const request = supertest(app);

const validParams = {
    filename: '1',
    width: 500,
    height: 250,
};
const invalidParams = {
    filename: 'x',
    width: -200,
    height: 0,
    extraParam: 'XYZ',
};
const testImagePath = path.join(
    __dirname,
    '../../../images/output/',
    `${validParams.filename}-${validParams.width}x${validParams.height}.jpg`
);

beforeEach(function () {
    try {
        if (fs.existsSync(testImagePath)) {
            fs.unlink(testImagePath, (err) => {
                if (err) return console.warn(`Image not found`);
                console.warn('Test image deleted');
            });
        }
    } catch {
        throw new Error();
    }
});

describe('sharpUtil tests:', () => {
    it('Expect generation of image via end point.', async () => {
        await request.get(
            `/api/images?filename=${validParams.filename}&width=${validParams.width}&height=${validParams.height}`
        );
        expect(fs.existsSync(testImagePath)).toBeTrue();
    });
    it('Expect generation of image via sharp', async () => {
        await resize(
            validParams.filename,
            validParams.width,
            validParams.height
        );
        expect(fs.existsSync(testImagePath)).toBeTrue();
    });
    it('Expect error on image generation via sharp', async () => {
        await expectAsync(
            resize(
                invalidParams.filename,
                invalidParams.width,
                invalidParams.height
            )
        ).toBeRejectedWithError();
    });
});

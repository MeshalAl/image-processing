import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';

const request = supertest(app);

const validParams = {
    filename: '1',
    width: '500',
    height: '250',
};
const testImagePath = path.join(
    __dirname,
    '../../../images/output/',
    `${validParams.filename}-${validParams.width}x${validParams.height}.jpg`
);

describe('sharpUtil tests:', () => {
    afterAll(function () {
        fs.unlink(testImagePath, (err) => {
            if (err) console.log(err);
            else {
                console.warn('\ntesting image deleted');
            }
        });
    });
    it('Expect generation of image.', async () => {
        await request.get(
            `/api/images?filename=${validParams.filename}&width=${validParams.width}&height=${validParams.height}`
        );
        expect(fs.existsSync(testImagePath)).toBeTrue();
    });
});

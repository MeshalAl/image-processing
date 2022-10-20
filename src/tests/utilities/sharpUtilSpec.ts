import supertest from 'supertest';
import app from '../..';
import fs from 'fs';
import path from 'path';
import resize from '../../utilities/sharpUtil';

const request = supertest(app);

const validParams = {
    filename: '1',
    width: 500,
    height: 250,
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
    
    it('Expect generation of image via end point.', async () => {
        await request.get(
            `/api/images?filename=${validParams.filename}&width=${validParams.width}&height=${validParams.height}`
        );
        expect(fs.existsSync(testImagePath)).toBeTrue();
    });
    it('Expect generation of image via sharp', async () => {

        expect(async () => {
            await resize(
                validParams.filename,
                validParams.width,
                validParams.height
            );
        }).not.toThrow();
        expect(fs.existsSync(testImagePath)).toBeTrue();
    });
});

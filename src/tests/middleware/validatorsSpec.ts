import supertest from 'supertest';
import app from '../../.';

const validParams = {
    filename: '1',
    width: 500,
    height: 250,
};
const invalidParams = {
    filename: 'x',
    width: '',
    height: 'Char',
    extraParam: 'XYZ',
};

const request = supertest(app);

describe('Validator tests:', () => {
    describe('Parameter tests: ', () => {
        it('Expect 200 on valid filename and dimensions', async () => {
            const response = await request.get(
                `/api/images?filename=${validParams.filename}&width=${validParams.width}&height=${validParams.height}`
            );
            expect(response.status).toBe(200);
        });
        it('Expect 404 on 4 or more parameters', async () => {
            const response = await request.get(
                `/api/images?filename=${validParams.filename}&width=${validParams.width}&height=${validParams.height}&extraParam=${invalidParams.extraParam}`
            );
            expect(response.status).toBe(404);
        });
        it('Expect 404 on missing filename', async () => {
            const response = await request.get(`/api/images?filename=`);
            expect(response.status).toBe(404);
        });
        it('Expect 404 on non-integer dimensions', async () => {
            const response = await request.get(
                `/api/images?filename=${validParams.filename}&width=${invalidParams.width}&heigh=${invalidParams.height}`
            );
            expect(response.status).toBe(404);
        });
        it('Expect 404 on missing params', async () => {
            const response = await request.get(
                `/api/images?filename=${validParams.filename}`
            );
            expect(response.status).toBe(404);
        });
    });
    describe('Image validation:', () => {
        it('Expect 404 on non-existing image', async () => {
            const response = await request.get(
                `/api/images?filename=${invalidParams.filename}&width=${validParams.width}&height=${validParams.height}`
            );
            expect(response.status).toBe(404);
        });
    });
});

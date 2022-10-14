import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('index app tests: ', () => {
    it('Expect app running by 200 on accessing /', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});

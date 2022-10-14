import supertest from 'supertest';
import app from '../../../.';

const request = supertest(app);

describe('Api tests: ', () => {
    it('Expect 200 on /api', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it('Expect 200 on /api/images', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });
    it('Expect 404 on invalid path:', async () => {
        const response = await request.get('/api/invalidpath');
        expect(response.status).toBe(404);
    });
});

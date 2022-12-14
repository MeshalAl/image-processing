import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use(routes);

app.listen(port, (): void => {
    console.log(`Running on localhost:${port}`);
});

export default app;

import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use(routes);

app.listen(port, () => {
    console.log(`listening to port: ${port}`);
});

export default app;

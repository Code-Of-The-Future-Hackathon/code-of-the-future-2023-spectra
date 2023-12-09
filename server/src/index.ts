import app from './utils/app';
import routes from './utils/routes';
import swaggerUi from 'swagger-ui-express';
import specs from '../swagger';
const port = process.env.PORT || 3000;

if (!process.env.PORT) {
    process.exit(1);
}

app.use('/', routes);

app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
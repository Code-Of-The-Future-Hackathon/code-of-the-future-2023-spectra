import app from './utils/app';
import routes from './utils/routes';

const port = process.env.PORT || 3000;

if (!process.env.PORT) {
    process.exit(1);
}

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
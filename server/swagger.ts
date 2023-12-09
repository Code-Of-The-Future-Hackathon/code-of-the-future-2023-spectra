import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Spectra API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/allergy/allergy.router.ts',
        './src/category/category.router.ts',
        './src/clinicalIllness/clinicalIllness.router.ts',
        './src/form/form.router.ts',
        './src/pharmacy/pharmacy.router.ts',
        './src/product/product.router.ts',
        './src/productPharmacy/productPharmacy.router.ts',
        './src/user/user.router.ts',
        './src/userAlergy/userAlergy.router.ts',
        './src/userClinicalIllness/userClinicalIllness.router.ts',
        './src/userPreferences/userPreferences.router.ts',
        './src/userProduct/userProduct.router.ts'], 
};

const specs = swaggerJsdoc(options);

app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

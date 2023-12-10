import swaggerJsdoc from 'swagger-jsdoc';

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
                //url: 'https://spectra-webapi.azurewebsites.net/'
            },
        ],
    },
    apis: [
        './src/category/category.router.ts',
        './src/form/form.router.ts',
        './src/pharmacy/pharmacy.router.ts',
        './src/product/product.router.ts',
        './src/productPharmacy/productPharmacy.router.ts',
        './src/user/user.router.ts',
        './src/userPreferences/userPreferences.router.ts',
        './src/userProduct/userProduct.router.ts',
        './src/userUsedMedicine/userUsedMedicine.router.ts',
        './src/userCondition/userCondition.router.ts',
        './src/condition/condition.router.ts',
    ], 
};

const specs = swaggerJsdoc(options);

export default specs;
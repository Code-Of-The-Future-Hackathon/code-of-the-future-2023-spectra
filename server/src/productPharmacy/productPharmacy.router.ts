import express from 'express';
import { body, validationResult } from 'express-validator';
import * as productPharmacyService from './productPharmacy.service';

export const productPharmacyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: productPharmacies
 *   description: API endpoints related to product pharmacies
 */


/**
 * @swagger
 * /productPharmacies:
 *   get:
 *     summary: Get a list of product pharmacies
 *     description: Retrieve a list of product pharmacies.
 *     tags: [productPharmacies]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 productId: "product_id_1"
 *                 pharmacyId: "pharmacy_id_1"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
productPharmacyRouter.get('/', async (request, response) => {
    try {
        const productPharmacies = await productPharmacyService.listProductPharmacies();
        return response.status(200).json(productPharmacies);
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /productPharmacies/{id}:
 *   get:
 *     summary: Get a single product pharmacy by id
 *     description: Retrieve a single product pharmacy by its id.
 *     tags: [productPharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product pharmacy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               productId: "product_id_1"
 *               pharmacyId: "pharmacy_id_1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Product Pharmacy not found
 */
productPharmacyRouter.get('/:id', async (request, response) => {
    const id = request.params.id;

    try {
        const productPharmacy = await productPharmacyService.getProductPharmacy(id);

        if (productPharmacy) {
            return response.status(200).json(productPharmacy);
        }
        return response.status(404).json('Product Pharmacy could not be found');
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /productPharmacies:
 *   post:
 *     summary: Create a product pharmacy
 *     description: Create a new product pharmacy.
 *     tags: [productPharmacies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: "product_id_1"
 *             pharmacyId: "pharmacy_id_1"
 *     responses:
 *       201:
 *         description: Product Pharmacy created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               productId: "product_id_1"
 *               pharmacyId: "pharmacy_id_1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
productPharmacyRouter.post(
    '/',
    body('productId').isString(),
    body('pharmacyId').isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const productPharmacy = request.body;
            const newProductPharmacy = await productPharmacyService.createProductPharmacy(productPharmacy);
            return response.status(201).json(newProductPharmacy);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /productPharmacies/{id}:
 *   put:
 *     summary: Update a product pharmacy
 *     description: Update an existing product pharmacy by its id.
 *     tags: [productPharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product pharmacy
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: "updated_product_id_1"
 *             pharmacyId: "updated_pharmacy_id_1"
 *     responses:
 *       200:
 *         description: Product Pharmacy updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               productId: "updated_product_id_1"
 *               pharmacyId: "updated_pharmacy_id_1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Product Pharmacy not found
 */
productPharmacyRouter.put(
    '/:id',
    body('productId').isString(),
    body('pharmacyId').isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const productPharmacy = request.body;
            const updatedProductPharmacy = await productPharmacyService.updateProductPharmacy(
                productPharmacy,
                id
            );

            return response.status(200).json(updatedProductPharmacy);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /productPharmacies/{id}:
 *   delete:
 *     summary: Delete a product pharmacy
 *     description: Delete an existing product pharmacy by its id.
 *     tags: [productPharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product pharmacy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product Pharmacy deleted successfully
 *       404:
 *         description: Product Pharmacy not found
 */
productPharmacyRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;

    try {
        await productPharmacyService.deleteProductPharmacy(id);
        return response.status(204).json('Product Pharmacy has been successfully deleted');
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

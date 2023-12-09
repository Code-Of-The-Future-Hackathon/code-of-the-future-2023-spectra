import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userProductService from './userProduct.service';
import type { Request, Response } from 'express';

export const userProductRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: userProduct
 *   description: API endpoints related to user products
 */


/**
 * @swagger
 * /userProduct:
 *   get:
 *     summary: Get a list of user products
 *     description: Retrieve a list of user products.
 *     tags: [userProduct]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 1
 *                 productId: 1
 *                 createdAt: '2023-01-01T00:00:00Z'
 *                 updatedAt: '2023-01-01T00:00:00Z'
 */
userProductRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userProducts = await userProductService.listUserProducts();
        return response.status(200).json(userProducts);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userProduct/{id}:
 *   get:
 *     summary: Get user product by ID
 *     description: Retrieve user product by its ID.
 *     tags: [userProduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               productId: 1
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       404:
 *         description: User product not found
 */
userProductRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userProduct = await userProductService.getUserProduct(id);

        if (userProduct) {
            return response.status(200).json(userProduct);
        }
        return response.status(404).json('User Product could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userProduct:
 *   post:
 *     summary: Create user product
 *     description: Create new user product.
 *     tags: [userProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             productId: 1
 *     responses:
 *       201:
 *         description: User product created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               productId: 1
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       400:
 *         description: Invalid request body
 */
userProductRouter.post(
    '/',
    body('userId').isString(),
    body('productId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userProduct = request.body;
            const newUserProduct = await userProductService.createUserProduct(userProduct);
            return response.status(201).json(newUserProduct);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userProduct/{id}:
 *   put:
 *     summary: Update user product
 *     description: Update existing user product by its ID.
 *     tags: [userProduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user product
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             productId: 2
 *     responses:
 *       200:
 *         description: User product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               productId: 2
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User product not found
 */
userProductRouter.put(
    '/:id',
    body('userId').isString(),
    body('productId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const userProduct = request.body;
            const updatedUserProduct = await userProductService.updateUserProduct(
                userProduct,
                id
            );

            return response.status(200).json(updatedUserProduct);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userProduct/{id}:
 *   delete:
 *     summary: Delete user product
 *     description: Delete existing user product by its ID.
 *     tags: [userProduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User product deleted successfully
 *       404:
 *         description: User product not found
 */
userProductRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userProductService.deleteUserProduct(id);
        return response
            .status(204)
            .json('User Product has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

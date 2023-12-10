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
 * components:
 *   schemas:
 *     UserProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the user product.
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the product.
 *         name:
 *           type: string
 *           description: The name of the user product.
 *         facts:
 *           type: array
 *           description: Facts about the user product.
 *           items:
 *             type: string
 *         advice:
 *           type: array
 *           description: Advice related to the user product.
 *           items:
 *             type: string
 *         statuses:
 *           type: string
 *           description: Statuses related to the user product.
 *         expert:
 *           type: string
 *           description: The expert associated with the user product.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user product was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user product was last updated.
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
 *               - id: "1"
 *                 userId: "1"
 *                 name: "Product A"
 *                 facts: ["Fact 1", "Fact 2"]
 *                 advice: ["Advice 1", "Advice 2"]
 *                 statuses: "Status A"
 *                 expert: "Expert A"
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
 *               id: "1"
 *               userId: "1"
 *               name: "Product A"
 *               facts: ["Fact 1", "Fact 2"]
 *               advice: ["Advice 1", "Advice 2"]
 *               statuses: "Status A"
 *               expert: "Expert A"
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       404:
 *         description: User product not found
 */
userProductRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userProduct = await userProductService.getUserProductById(id);

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
 *             userId: "1"
 *             name: "Product A"
 *             facts: ["Fact 1", "Fact 2"]
 *             advice: ["Advice 1", "Advice 2"]
 *             statuses: "Status A"
 *             expert: "Expert A"
 *     responses:
 *       201:
 *         description: User product created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               name: "Product A"
 *               facts: ["Fact 1", "Fact 2"]
 *               advice: ["Advice 1", "Advice 2"]
 *               statuses: "Status A"
 *               expert: "Expert A"
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       400:
 *         description: Invalid request body
 */
userProductRouter.post(
    '/',
    body('userId').isString(),
    body('name').isString(),
    body('facts').isArray(),
    body('advice').isArray(),
    body('statuses').isString(),
    body('expert').isString(),
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
 *             userId: "1"
 *             name: "Updated Product A"
 *             facts: ["Updated Fact 1", "Updated Fact 2"]
 *             advice: ["Updated Advice 1", "Updated Advice 2"]
 *             statuses: "Updated Status A"
 *             expert: "Updated Expert A"
 *     responses:
 *       200:
 *         description: User product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               name: "Updated Product A"
 *               facts: ["Updated Fact 1", "Updated Fact 2"]
 *               advice: ["Updated Advice 1", "Updated Advice 2"]
 *               statuses: "Updated Status A"
 *               expert: "Updated Expert A"
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
    body('name').isString(),
    body('facts').isArray(),
    body('advice').isArray(),
    body('statuses').isString(),
    body('expert').isString(),
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

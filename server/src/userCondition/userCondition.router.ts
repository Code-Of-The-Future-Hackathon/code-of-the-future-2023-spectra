import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userConditionService from './userCondition.service';
import type { Request, Response } from 'express';

export const userConditionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserConditions
 *   description: API endpoints related to user conditions
 */

/**
 * @swagger
 * /userConditions:
 *   get:
 *     summary: Get a list of user conditions
 *     description: Retrieve a list of user conditions.
 *     tags: [UserConditions]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 userId: "1"
 *                 conditionId: "1"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
userConditionRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userConditions = await userConditionService.listUserConditions();
        return response.status(200).json(userConditions);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userConditions/{id}:
 *   get:
 *     summary: Get a single user condition by id
 *     description: Retrieve a single user condition by its id.
 *     tags: [UserConditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user condition
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
 *               conditionId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: User Condition not found
 */
userConditionRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userCondition = await userConditionService.getUserCondition(id);

        if (userCondition) {
            return response.status(200).json(userCondition);
        }
        return response.status(404).json('User Condition could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userConditions:
 *   post:
 *     summary: Create a user condition
 *     description: Create a new user condition.
 *     tags: [UserConditions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             conditionId: "1"
 *     responses:
 *       201:
 *         description: User Condition created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               conditionId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
userConditionRouter.post(
    '/',
    body('userId').isString(),
    body('conditionId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userCondition = request.body;
            const newUserCondition = await userConditionService.createUserCondition(userCondition);
            return response.status(201).json(newUserCondition);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userConditions/{id}:
 *   put:
 *     summary: Update a user condition
 *     description: Update an existing user condition by its id.
 *     tags: [UserConditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user condition
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             conditionId: "2"
 *     responses:
 *       200:
 *         description: User Condition updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               conditionId: "2"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User Condition not found
 */
userConditionRouter.put(
    '/:id',
    body('userId').isString(),
    body('conditionId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const userCondition = request.body;
            const updatedUserCondition = await userConditionService.updateUserCondition(
                userCondition,
                id
            );

            return response.status(200).json(updatedUserCondition);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userConditions/{id}:
 *   delete:
 *     summary: Delete a user condition
 *     description: Delete an existing user condition by its id.
 *     tags: [UserConditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user condition
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User Condition deleted successfully
 *       404:
 *         description: User Condition not found
 */
userConditionRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userConditionService.deleteUserCondition(id);
        return response
            .status(204)
            .json('User Condition has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});
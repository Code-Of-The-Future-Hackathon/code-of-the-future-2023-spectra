import express from 'express';
import { body, validationResult } from 'express-validator';
import * as conditionService from './condition.service';
import type { Request, Response } from 'express';

export const conditionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Conditions
 *   description: API endpoints related to conditions
 */

/**
 * @swagger
 * /conditions:
 *   get:
 *     summary: Get a list of conditions
 *     description: Retrieve a list of conditions.
 *     tags: [Conditions]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 alergies: "Some allergies"
 *                 chronicDiseases: "Some chronic diseases"
 *                 diseases: "Some diseases"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
conditionRouter.get('/', async (request: Request, response: Response) => {
    try {
        const conditions = await conditionService.listConditions();
        return response.status(200).json(conditions);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /conditions/{id}:
 *   get:
 *     summary: Get a single condition by id
 *     description: Retrieve a single condition by its id.
 *     tags: [Conditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the condition
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
 *               alergies: "Some allergies"
 *               chronicDiseases: "Some chronic diseases"
 *               diseases: "Some diseases"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Condition not found
 */
conditionRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const condition = await conditionService.getCondition(id);

        if (condition) {
            return response.status(200).json(condition);
        }
        return response.status(404).json('Condition could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /conditions:
 *   post:
 *     summary: Create a condition
 *     description: Create a new condition.
 *     tags: [Conditions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             alergies: "Some allergies"
 *             chronicDiseases: "Some chronic diseases"
 *             diseases: "Some diseases"
 *     responses:
 *       201:
 *         description: Condition created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               alergies: "Some allergies"
 *               chronicDiseases: "Some chronic diseases"
 *               diseases: "Some diseases"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
conditionRouter.post(
    '/',
    body('alergies').isString(),
    body('chronicDiseases').isString(),
    body('diseases').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const condition = request.body;
            const newCondition = await conditionService.createCondition(condition);
            return response.status(201).json(newCondition);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /conditions/{id}:
 *   put:
 *     summary: Update a condition
 *     description: Update an existing condition by its id.
 *     tags: [Conditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the condition
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             alergies: "Updated allergies"
 *             chronicDiseases: "Updated chronic diseases"
 *             diseases: "Updated diseases"
 *     responses:
 *       200:
 *         description: Condition updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               alergies: "Updated allergies"
 *               chronicDiseases: "Updated chronic diseases"
 *               diseases: "Updated diseases"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Condition not found
 */
conditionRouter.put(
    '/:id',
    body('alergies').isString(),
    body('chronicDiseases').isString(),
    body('diseases').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const condition = request.body;
            const updatedCondition = await conditionService.updateCondition(condition, id);

            return response.status(200).json(updatedCondition);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /conditions/{id}:
 *   delete:
 *     summary: Delete a condition
 *     description: Delete an existing condition by its id.
 *     tags: [Conditions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the condition
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Condition deleted successfully
 *       404:
 *         description: Condition not found
 */
conditionRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await conditionService.deleteCondition(id);
        return response.status(204).json('Condition has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});
import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userPreferencesService from './userPreferences.service';
import type { Request, Response } from 'express';

export const userPreferencesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: userPreferences
 *   description: API endpoints related to user preferences
 */

/**
 * @swagger
 * /userPreferences:
 *   get:
 *     summary: Get a list of user preferences
 *     description: Retrieve a list of user preferences.
 *     tags: [userPreferences]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 1
 *                 dosage: 'Once a day'
 *                 time: 'Morning'
 *                 createdAt: '2023-01-01T00:00:00Z'
 *                 updatedAt: '2023-01-01T00:00:00Z'
 */
userPreferencesRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userPreferences = await userPreferencesService.listUserPreferences();
        return response.status(200).json(userPreferences);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userPreferences/{id}:
 *   get:
 *     summary: Get user preferences by ID
 *     description: Retrieve user preferences by its ID.
 *     tags: [userPreferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user preferences
 *         required: true
 *         schema:
 *           type: numeric
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               dosage: 'Once a day'
 *               time: 'Morning'
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       404:
 *         description: User preferences not found
 */
userPreferencesRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userPreferences = await userPreferencesService.getUserPreferences(id);

        if (userPreferences) {
            return response.status(200).json(userPreferences);
        }
        return response.status(404).json('User preferences could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userPreferences:
 *   post:
 *     summary: Create user preferences
 *     description: Create new user preferences.
 *     tags: [userPreferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             dosage: 'Once a day'
 *             time: 'Morning'
 *     responses:
 *       201:
 *         description: User preferences created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               dosage: 'Once a day'
 *               time: 'Morning'
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       400:
 *         description: Invalid request body
 */
userPreferencesRouter.post(
    '/',
    body('userId').isNumeric(),
    body('dosage').isString(),
    body('time').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userPreferences = request.body;
            const newUserPreferences = await userPreferencesService.createUserPreferences(userPreferences);
            return response.status(201).json(newUserPreferences);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userPreferences/{id}:
 *   put:
 *     summary: Update user preferences
 *     description: Update existing user preferences by its ID.
 *     tags: [userPreferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user preferences
 *         required: true
 *         schema:
 *           type: numeric
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             dosage: 'Twice a day'
 *             time: 'Evening'
 *     responses:
 *       200:
 *         description: User preferences updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               dosage: 'Twice a day'
 *               time: 'Evening'
 *               createdAt: '2023-01-01T00:00:00Z'
 *               updatedAt: '2023-01-01T00:00:00Z'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User preferences not found
 */
userPreferencesRouter.put(
    '/:id',
    body('userId').isNumeric(),
    body('dosage').isString(),
    body('time').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const userPreferences = request.body;
            const updatedUserPreferences = await userPreferencesService.updateUserPreferences(userPreferences, id);

            return response.status(200).json(updatedUserPreferences);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userPreferences/{id}:
 *   delete:
 *     summary: Delete user preferences
 *     description: Delete existing user preferences by its ID.
 *     tags: [userPreferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user preferences
 *         required: true
 *         schema:
 *           type: numeric
 *     responses:
 *       204:
 *         description: User preferences deleted successfully
 *       404:
 *         description: User preferences not found
 */
userPreferencesRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userPreferencesService.deleteUserPreferences(id);
        return response.status(204).json('User preferences have been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

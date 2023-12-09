import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as userPreferencesService from './userPreferences.service';

export const userPreferencesRouter = express.Router();

// GET: list of all user preferences
userPreferencesRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userPreferences = await userPreferencesService.listUserPreferences();
        return response.status(200).json(userPreferences);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: a single user preferences by id
userPreferencesRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

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

// POST: create user preferences
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

// PUT: updating user preferences
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

        const id: number = parseInt(request.params.id, 10);

        try {
            const userPreferences = request.body;
            const updatedUserPreferences = await userPreferencesService.updateUserPreferences(userPreferences, id);

            return response.status(200).json(updatedUserPreferences);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

// DELETE: Delete user preferences based on the id
userPreferencesRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        await userPreferencesService.deleteUserPreferences(id);
        return response.status(204).json('User preferences have been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

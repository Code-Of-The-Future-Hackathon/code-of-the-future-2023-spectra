// userAlergy.router.ts
import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userAllergyService from './userAlergy.service';
import type { Request, Response } from 'express';

export const userAlergyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: userAlergy
 *   description: API endpoints related to user allergies
 */


/**
 * @swagger
 * /userAllergies:
 *   get:
 *     summary: Get a list of user allergies
 *     description: Retrieve a list of user allergies.
 *     tags: [userAlergy]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 userId: "1"
 *                 allergyId: "1"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
userAlergyRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userAllergies = await userAllergyService.listUserAllergies();
        return response.status(200).json(userAllergies);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userAllergies/{id}:
 *   get:
 *     summary: Get a single user allergy by id
 *     description: Retrieve a single user allergy by its id.
 *     tags: [userAlergy]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user allergy
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
 *               allergyId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: User Allergy not found
 */
userAlergyRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userAllergy = await userAllergyService.getUserAllergy(id);

        if (userAllergy) {
            return response.status(200).json(userAllergy);
        }
        return response.status(404).json('User Allergy could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userAllergies:
 *   post:
 *     summary: Create a user allergy
 *     description: Create a new user allergy.
 *     tags: [userAlergy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             allergyId: "1"
 *     responses:
 *       201:
 *         description: User Allergy created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               allergyId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
userAlergyRouter.post(
    '/',
    body('userId').isString(),
    body('allergyId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userAllergy = request.body;
            const newUserAllergy = await userAllergyService.createUserAllergy(userAllergy);
            return response.status(201).json(newUserAllergy);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userAllergies/{id}:
 *   put:
 *     summary: Update a user allergy
 *     description: Update an existing user allergy by its id.
 *     tags: [userAlergy]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user allergy
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             allergyId: "2"
 *     responses:
 *       200:
 *         description: User Allergy updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               allergyId: "2"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User Allergy not found
 */
userAlergyRouter.put(
    '/:id',
    body('userId').isString(),
    body('allergyId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const userAllergy = request.body;
            const updatedUserAllergy = await userAllergyService.updateUserAllergy(
                userAllergy,
                id
            );

            return response.status(200).json(updatedUserAllergy);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userAllergies/{id}:
 *   delete:
 *     summary: Delete a user allergy
 *     description: Delete an existing user allergy by its id.
 *     tags: [userAlergy]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user allergy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User Allergy deleted successfully
 *       404:
 *         description: User Allergy not found
 */
userAlergyRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userAllergyService.deleteUserAllergy(id);
        return response
            .status(204)
            .json('User Allergy has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

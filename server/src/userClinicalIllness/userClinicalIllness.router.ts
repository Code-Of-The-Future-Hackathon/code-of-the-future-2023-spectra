// userClinicalIllness.router.ts
import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userClinicalIllnessService from './userClinicalIllness.service';
import type { Request, Response } from 'express';

export const userClinicalIllnessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: userClinicalIllness
 *   description: API endpoints related to user clinical illnesses
 */


/**
 * @swagger
 * /userClinicalIllnesses:
 *   get:
 *     summary: Get a list of user clinical illnesses
 *     description: Retrieve a list of user clinical illnesses.
 *     tags: [userClinicalIllness]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 userId: "1"
 *                 clinicalIllnessId: "1"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
userClinicalIllnessRouter.get('/', async (request: Request, response: Response) => {
    try {
        const userClinicalIllnesses = await userClinicalIllnessService.listUserClinicalIllnesses();
        return response.status(200).json(userClinicalIllnesses);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userClinicalIllnesses/{id}:
 *   get:
 *     summary: Get a single user clinical illness by id
 *     description: Retrieve a single user clinical illness by its id.
 *     tags: [userClinicalIllness]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user clinical illness
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
 *               clinicalIllnessId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: User Clinical Illness not found
 */
userClinicalIllnessRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userClinicalIllness = await userClinicalIllnessService.getUserClinicalIllness(id);

        if (userClinicalIllness) {
            return response.status(200).json(userClinicalIllness);
        }
        return response.status(404).json('User Clinical Illness could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userClinicalIllnesses:
 *   post:
 *     summary: Create a user clinical illness
 *     description: Create a new user clinical illness.
 *     tags: [userClinicalIllness]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             clinicalIllnessId: "1"
 *     responses:
 *       201:
 *         description: User Clinical Illness created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               clinicalIllnessId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
userClinicalIllnessRouter.post(
    '/',
    body('userId').isString(),
    body('clinicalIllnessId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userClinicalIllness = request.body;
            const newUserClinicalIllness = await userClinicalIllnessService.createUserClinicalIllness(userClinicalIllness);
            return response.status(201).json(newUserClinicalIllness);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userClinicalIllnesses/{id}:
 *   put:
 *     summary: Update a user clinical illness
 *     description: Update an existing user clinical illness by its id.
 *     tags: [userClinicalIllness]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user clinical illness
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             clinicalIllnessId: "2"
 *     responses:
 *       200:
 *         description: User Clinical Illness updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               clinicalIllnessId: "2"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User Clinical Illness not found
 */
userClinicalIllnessRouter.put(
    '/:id',
    body('userId').isString(),
    body('clinicalIllnessId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const userClinicalIllness = request.body;
            const updatedUserClinicalIllness = await userClinicalIllnessService.updateUserClinicalIllness(
                userClinicalIllness,
                id
            );

            return response.status(200).json(updatedUserClinicalIllness);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userClinicalIllnesses/{id}:
 *   delete:
 *     summary: Delete a user clinical illness
 *     description: Delete an existing user clinical illness by its id.
 *     tags: [userClinicalIllness]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user clinical illness
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User Clinical Illness deleted successfully
 *       404:
 *         description: User Clinical Illness not found
 */
userClinicalIllnessRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userClinicalIllnessService.deleteUserClinicalIllness(id);
        return response
            .status(204)
            .json('User Clinical Illness has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

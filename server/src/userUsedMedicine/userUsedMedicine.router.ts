import express from 'express';
import { body, validationResult } from 'express-validator';
import * as userUsedMedicineService from './userUsedMedicine.service';
import type { Request, Response } from 'express';

export const userUsedMedicineRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserUsedMedicines
 *   description: API endpoints related to user-used medicines
 */

/**
 * @swagger
 * /userUsedMedicines:
 *   get:
 *     summary: Get a list of user-used medicines
 *     description: Retrieve a list of user-used medicines.
 *     tags: [UserUsedMedicines]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 userId: "1"
 *                 medicine: ["Medicine1", "Medicine2"]
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
userUsedMedicineRouter.get('/', async (_, response: Response) => {
    try {
        const userUsedMedicines = await userUsedMedicineService.listUserUsedMedicines();
        return response.status(200).json(userUsedMedicines);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userUsedMedicines/{id}:
 *   get:
 *     summary: Get a single user-used medicine by id
 *     description: Retrieve a single user-used medicine by its id.
 *     tags: [UserUsedMedicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user-used medicine
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
 *               medicine: ["Medicine1", "Medicine2"]
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: User-Used Medicine not found
 */
userUsedMedicineRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const userUsedMedicine = await userUsedMedicineService.getUserUsedMedicine(id);

        if (userUsedMedicine) {
            return response.status(200).json(userUsedMedicine);
        }
        return response.status(404).json('User-Used Medicine could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /userUsedMedicines:
 *   post:
 *     summary: Create a user-used medicine
 *     description: Create a new user-used medicine.
 *     tags: [UserUsedMedicines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             medicine: ["Medicine1", "Medicine2"]
 *     responses:
 *       201:
 *         description: User-Used Medicine created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               medicine: ["Medicine1", "Medicine2"]
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
userUsedMedicineRouter.post(
    '/',
    body('userId').isString(),
    body('medicine').isArray(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userUsedMedicine = request.body;
            const newUserUsedMedicine = await userUsedMedicineService.createUserUsedMedicine(userUsedMedicine);
            return response.status(201).json(newUserUsedMedicine);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userUsedMedicines/{id}:
 *   put:
 *     summary: Update a user-used medicine
 *     description: Update an existing user-used medicine by its id.
 *     tags: [UserUsedMedicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user-used medicine
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "1"
 *             medicine: ["UpdatedMedicine1", "UpdatedMedicine2"]
 *     responses:
 *       200:
 *         description: User-Used Medicine updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               userId: "1"
 *               medicine: ["UpdatedMedicine1", "UpdatedMedicine2"]
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User-Used Medicine not found
 */
userUsedMedicineRouter.put(
    '/:id',
    body('userId').isString(),
    body('medicine').isArray(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const userUsedMedicine = request.body;
            const updatedUserUsedMedicine = await userUsedMedicineService.updateUserUsedMedicine(
                userUsedMedicine,
                id
            );

            return response.status(200).json(updatedUserUsedMedicine);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /userUsedMedicines/{id}:
 *   delete:
 *     summary: Delete a user-used medicine
 *     description: Delete an existing user-used medicine by its id.
 *     tags: [UserUsedMedicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user-used medicine
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User-Used Medicine deleted successfully
 *       404:
 *         description: User-Used Medicine not found
 */
userUsedMedicineRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userUsedMedicineService.deleteUserUsedMedicine(id);
        return response
            .status(204)
            .json('User-Used Medicine has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

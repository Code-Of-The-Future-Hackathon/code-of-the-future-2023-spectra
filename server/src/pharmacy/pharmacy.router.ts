import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as pharmacyService from './pharmacy.service';

export const pharmacyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pharmacies
 *   description: API endpoints related to pharmaciess
 */


/**
 * @swagger
 * /pharmacies:
 *   get:
 *     summary: Get a list of pharmacies
 *     description: Retrieve a list of pharmacies.
 *     tags: [Pharmacies]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "ABC Pharmacy"
 *                 openTime: "08:00 AM"
 *                 closeTime: "06:00 PM"
 *                 latitude: 40.7128
 *                 longitude: -74.0060
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
pharmacyRouter.get('/', async (request: Request, response: Response) => {
    try {
        const pharmacies = await pharmacyService.listPharmacies();
        return response.status(200).json(pharmacies);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /pharmacies/{id}:
 *   get:
 *     summary: Get a single pharmacy by id
 *     description: Retrieve a single pharmacy by its id.
 *     tags: [Pharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the pharmacy
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
 *               name: "ABC Pharmacy"
 *               openTime: "08:00 AM"
 *               closeTime: "06:00 PM"
 *               latitude: 40.7128
 *               longitude: -74.0060
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Pharmacy not found
 */
pharmacyRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const pharmacy = await pharmacyService.getPharmacy(id);

        if (pharmacy) {
            return response.status(200).json(pharmacy);
        }
        return response.status(404).json('Pharmacy could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /pharmacies:
 *   post:
 *     summary: Create a pharmacy
 *     description: Create a new pharmacy.
 *     tags: [Pharmacies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "ABC Pharmacy"
 *             openTime: "08:00 AM"
 *             closeTime: "06:00 PM"
 *             latitude: 40.7128
 *             longitude: -74.0060
 *     responses:
 *       201:
 *         description: Pharmacy created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "ABC Pharmacy"
 *               openTime: "08:00 AM"
 *               closeTime: "06:00 PM"
 *               latitude: 40.7128
 *               longitude: -74.0060
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
pharmacyRouter.post(
    '/',
    body('name').isString(),
    body('openTime').isString(),
    body('closeTime').isString(),
    body('latitude').isFloat(),
    body('longitude').isFloat(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const pharmacy = request.body;

            const newPharmacy = await pharmacyService.createPharmacy(pharmacy);
            return response.status(201).json(newPharmacy);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /pharmacies/{id}:
 *   put:
 *     summary: Update a pharmacy
 *     description: Update an existing pharmacy by its id.
 *     tags: [Pharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the pharmacy
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated ABC Pharmacy"
 *             openTime: "09:00 AM"
 *             closeTime: "07:00 PM"
 *             latitude: 40.7128
 *             longitude: -74.0060
 *     responses:
 *       200:
 *         description: Pharmacy updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "Updated ABC Pharmacy"
 *               openTime: "09:00 AM"
 *               closeTime: "07:00 PM"
 *               latitude: 40.7128
 *               longitude: -74.0060
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Pharmacy not found
 */
pharmacyRouter.put(
    '/:id',
    body('name').isString(),
    body('formId').isNumeric(),
    body('closeTime').isString(),
    body('latitude').isFloat(),
    body('longitude').isFloat(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const pharmacy = request.body;
            const updatedPharmacy = await pharmacyService.updatePharmacy(pharmacy, id);

            return response.status(200).json(updatedPharmacy);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /pharmacies/{id}:
 *   delete:
 *     summary: Delete a pharmacy
 *     description: Delete an existing pharmacy by its id.
 *     tags: [Pharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the pharmacy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pharmacy deleted successfully
 *       404:
 *         description: Pharmacy not found
 */
pharmacyRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await pharmacyService.deletePharmacy(id);
        return response.status(204).json('Pharmacy has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

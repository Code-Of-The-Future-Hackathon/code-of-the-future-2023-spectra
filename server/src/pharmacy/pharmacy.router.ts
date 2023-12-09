import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as pharmacyService from './pharmacy.service';

export const pharmacyRouter = express.Router();

// GET: list of all pharmacies
pharmacyRouter.get('/', async (request: Request, response: Response) => {
    try {
        const pharmacies = await pharmacyService.listPharmacies();
        return response.status(200).json(pharmacies);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: a single pharmacy by id
pharmacyRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

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

// POST: create a pharmacy
pharmacyRouter.post(
    '/',
    body('name').isString(),
    body('formId').isNumeric(),
    body('address').isString(),
    body('openTime').isString(),
    body('closeTime').isString(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric(),
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

// PUT: updating a pharmacy
pharmacyRouter.put(
    '/:id',
    body('name').isString(),
    body('formId').isNumeric(),
    body('address').isString(),
    body('openTime').isString(),
    body('closeTime').isString(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id: number = parseInt(request.params.id, 10);

        try {
            const pharmacy = request.body;
            const updatedPharmacy = await pharmacyService.updatePharmacy(pharmacy, id);

            return response.status(200).json(updatedPharmacy);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

// DELETE: Delete a pharmacy based on the id
pharmacyRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        await pharmacyService.deletePharmacy(id);
        return response.status(204).json('Pharmacy has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

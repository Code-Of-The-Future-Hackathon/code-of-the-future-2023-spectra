import express from 'express';
import { Request, Response } from 'express';
import * as allergyService from './allergy.service';

export const allergyRouter = express.Router();

// GET: list of all allergies
allergyRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allergies = await allergyService.listAllergies();
        return response.status(200).json(allergies);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: a single allergy by id
allergyRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const allergy = await allergyService.getAllergyById(id);

        if (allergy) {
            return response.status(200).json(allergy);
        }
        return response.status(404).json('Allergy could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

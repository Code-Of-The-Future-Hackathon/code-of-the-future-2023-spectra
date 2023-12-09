import express from 'express';
import { Request, Response } from 'express';
import * as clynicalIlnessService from './clynicalIlness.service';

export const clynicalIlnessRouter = express.Router();

// GET: list of all allergies
clynicalIlnessRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allergies = await clynicalIlnessService.listClynicalIlnesses();
        return response.status(200).json(allergies);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: a single allergy by id
clynicalIlnessRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const allergy = await clynicalIlnessService.getClynicalIlnessById(id);

        if (allergy) {
            return response.status(200).json(allergy);
        }
        return response.status(404).json('Allergy could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

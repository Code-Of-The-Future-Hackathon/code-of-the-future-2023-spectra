import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as productService from './status.service';

export const statusRouter = express.Router();

statusRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const product = await productService.getStatus(id);

        if (product) {
            return response.status(200).json(product);
        }
        return response.status(404).json('Product could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});
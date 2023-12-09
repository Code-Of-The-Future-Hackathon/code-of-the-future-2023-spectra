import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as productService from './product.service';

export const productRouter = express.Router();

// GET: list of all products
productRouter.get('/', async (request: Request, response: Response) => {
    try {
        const products = await productService.listProducts();
        return response.status(200).json(products);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: a single product by id
productRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const product = await productService.getProduct(id);

        if (product) {
            return response.status(200).json(product);
        }
        return response.status(404).json('Product could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// POST: create a product
productRouter.post(
    '/',
    body('name').isString(),
    body('formId').isNumeric(),
    body('sideEffects').isString(),
    body('storage').isString(),
    body('dosage').isString(),
    body('ingredients').isArray(),
    body('contradictions').isString(),
    body('categoryId').isNumeric(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const product = request.body;

            const newProduct = await productService.createProduct(product);
            return response.status(201).json(newProduct);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

// PUT: updating a product
productRouter.put(
    '/:id',
    body('name').isString(),
    body('formId').isNumeric(),
    body('sideEffects').isString(),
    body('storage').isString(),
    body('dosage').isString(),
    body('ingredients').isArray(),
    body('contradictions').isString(),
    body('categoryId').isNumeric(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id: number = parseInt(request.params.id, 10);

        try {
            const product = request.body;
            const updatedProduct = await productService.updateProduct(product, id);

            return response.status(200).json(updatedProduct);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

// DELETE: Delete a product based on the id
productRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        await productService.deleteProduct(id);
        return response.status(204).json('Product has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

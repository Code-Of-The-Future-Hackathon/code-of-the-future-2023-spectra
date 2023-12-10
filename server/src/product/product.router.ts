import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as productService from './product.service';

export const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints related to products
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "Product A"
 *                 formId: "1"
 *                 sideEffects: "Some side effects"
 *                 storage: "Store in a cool, dry place"
 *                 dosage: "Take one tablet daily"
 *                 ingredients: ["Ingredient A", "Ingredient B"]
 *                 contradictions: "Do not take if allergic"
 *                 categoryId: "1"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
productRouter.get('/', async (request: Request, response: Response) => {
    try {
        const products = await productService.listProducts();
        return response.status(200).json(products);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by id
 *     description: Retrieve a single product by its id.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product
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
 *               name: "Product A"
 *               formId: "1"
 *               sideEffects: "Some side effects"
 *               storage: "Store in a cool, dry place"
 *               dosage: "Take one tablet daily"
 *               ingredients: ["Ingredient A", "Ingredient B"]
 *               contradictions: "Do not take if allergic"
 *               categoryId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

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

/**
 * @swagger
 * /products/barcode/{barcode}:
 *   get:
 *     summary: Get a single product by barcode
 *     description: Retrieve a single product by its barcode.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: barcode
 *         description: Barcode of the product
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
 *               name: "Product A"
 *               formId: "1"
 *               sideEffects: "Some side effects"
 *               storage: "Store in a cool, dry place"
 *               dosage: "Take one tablet daily"
 *               ingredients: ["Ingredient A", "Ingredient B"]
 *               contradictions: "Do not take if allergic"
 *               categoryId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Product not found
 */
productRouter.get('/barcode/:barcode', async (req: Request, res: Response) => {
    const { barcode } = req.params;
  
    try {
      const product = await productService.getProductByBarcode(barcode);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     description: Create a new product.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Product A"
 *             formId: "1"
 *             sideEffects: "Some side effects"
 *             storage: "Store in a cool, dry place"
 *             dosage: "Take one tablet daily"
 *             ingredients: ["Ingredient A", "Ingredient B"]
 *             contradictions: "Do not take if allergic"
 *             categoryId: "1"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "Product A"
 *               formId: "1"
 *               sideEffects: "Some side effects"
 *               storage: "Store in a cool, dry place"
 *               dosage: "Take one tablet daily"
 *               ingredients: ["Ingredient A", "Ingredient B"]
 *               contradictions: "Do not take if allergic"
 *               categoryId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
productRouter.post(
    '/',
    body('name').isString(),
    body('formId').isString(),
    body('sideEffects').isString(),
    body('storage').isString(),
    body('dosage').isString(),
    body('ingredients').isArray(),
    body('contradictions').isString(),
    body('categoryId').isString(),
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

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product by its id.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Product A"
 *             formId: "1"
 *             sideEffects: "Some updated side effects"
 *             storage: "Updated storage instructions"
 *             dosage: "Updated dosage instructions"
 *             ingredients: ["Updated Ingredient A", "Updated Ingredient B"]
 *             contradictions: "Updated contradictions"
 *             categoryId: "1"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "Updated Product A"
 *               formId: "1"
 *               sideEffects: "Some updated side effects"
 *               storage: "Updated storage instructions"
 *               dosage: "Updated dosage instructions"
 *               ingredients: ["Updated Ingredient A", "Updated Ingredient B"]
 *               contradictions: "Updated contradictions"
 *               categoryId: "1"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Product not found
 */
productRouter.put(
    '/:id',
    body('name').isString(),
    body('formId').isString(),
    body('sideEffects').isString(),
    body('storage').isString(),
    body('dosage').isString(),
    body('ingredients').isArray(),
    body('contradictions').isString(),
    body('categoryId').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const product = request.body;
            const updatedProduct = await productService.updateProduct(product, id);

            return response.status(200).json(updatedProduct);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product by its id.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await productService.deleteProduct(id);
        return response.status(204).json('Product has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

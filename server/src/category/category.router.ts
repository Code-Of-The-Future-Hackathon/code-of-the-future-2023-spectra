import express from "express";
import { body, validationResult } from "express-validator";
import * as categoryService from "./category.service";

export const categoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints related to categories
 */


/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of categories
 *     description: Retrieve a list of categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 category: "Electronics"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
categoryRouter.get("/", async (request, response) => {
    try {
        const categories = await categoryService.listCategories();
        return response.status(200).json(categories);
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category by id
 *     description: Retrieve a single category by its id.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category
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
 *               category: "Electronics"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Category not found
 */
categoryRouter.get("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        const category = await categoryService.getCategory(id);

        if (category) {
            return response.status(200).json(category);
        }
        return response.status(404).json("Category could not be found");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a category
 *     description: Create a new category.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             category: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               category: "Electronics"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
categoryRouter.post(
    "/",
    body("category").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const category = request.body;
            const newCategory = await categoryService.createCategory(category);
            return response.status(201).json(newCategory);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update an existing category by its id.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             category: "New Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               category: "New Category Name"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Category not found
 */
categoryRouter.put(
    "/:id",
    body("category").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const category = request.body;
            const updatedCategory = await categoryService.updateCategory(
                category,
                id
            );

            return response.status(200).json(updatedCategory);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete an existing category by its id.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
categoryRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        await categoryService.deleteCategory(id);
        return response
            .status(204)
            .json("Category has been successfully deleted");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

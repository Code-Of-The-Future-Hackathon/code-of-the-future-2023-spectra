// allergy.router.ts
import express from 'express';
import { body, validationResult } from 'express-validator';
import * as allergyService from './allergy.service';
import type { Request, Response } from 'express';

export const allergyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Allergies
 *   description: API endpoints related to allergies
 */

/**
 * @swagger
 * /allergies:
 *   get:
 *     summary: Get a list of allergies
 *     description: Retrieve a list of allergies.
 *     tags: [Allergies]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "Peanut Allergy"
 *                 information: "Allergic reaction to peanuts"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
allergyRouter.get("/", async (request, response) => {
    try {
        const allergies = await allergyService.listAllergies();
        return response.status(200).json(allergies);
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /allergies/{id}:
 *   get:
 *     summary: Get a single allergy by id
 *     description: Retrieve a single allergy by its id.
 *     tags: [Allergies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the allergy
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
 *               name: "Peanut Allergy"
 *               information: "Allergic reaction to peanuts"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Allergy not found
 */
allergyRouter.get("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        const allergy = await allergyService.getAllergy(id);

        if (allergy) {
            return response.status(200).json(allergy);
        }
        return response.status(404).json("Allergy could not be found");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /allergies:
 *   post:
 *     summary: Create an allergy
 *     description: Create a new allergy.
 *     tags: [Allergies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Peanut Allergy"
 *             information: "Allergic reaction to peanuts"
 *     responses:
 *       201:
 *         description: Allergy created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "Peanut Allergy"
 *               information: "Allergic reaction to peanuts"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
allergyRouter.post(
    "/",
    body("name").isString(),
    body("information").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const allergy = request.body;
            const newAllergy = await allergyService.createAllergy(allergy);
            return response.status(201).json(newAllergy);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /allergies/{id}:
 *   put:
 *     summary: Update an allergy
 *     description: Update an existing allergy by its id.
 *     tags: [Allergies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the allergy
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "New Allergy Name"
 *             information: "New information about the allergy"
 *     responses:
 *       200:
 *         description: Allergy updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "New Allergy Name"
 *               information: "New information about the allergy"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Allergy not found
 */
allergyRouter.put(
    "/:id",
    body("name").isString(),
    body("information").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const allergy = request.body;
            const updatedAllergy = await allergyService.updateAllergy(allergy, id);

            return response.status(200).json(updatedAllergy);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /allergies/{id}:
 *   delete:
 *     summary: Delete an allergy
 *     description: Delete an existing allergy by its id.
 *     tags: [Allergies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the allergy
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Allergy deleted successfully
 *       404:
 *         description: Allergy not found
 */
allergyRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        await allergyService.deleteAllergy(id);
        return response.status(204).json("Allergy has been successfully deleted");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

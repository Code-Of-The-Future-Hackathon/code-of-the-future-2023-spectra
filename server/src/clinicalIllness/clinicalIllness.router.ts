import express from "express";
import { body, validationResult } from "express-validator";
import * as clinicalIllnessService from "./clinicalIllness.service";

export const clinicalIllnessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: clinicalIllnesses
 *   description: API endpoints related to clinical illnesses
 */


/**
 * @swagger
 * /clinical-illnesses:
 *   get:
 *     summary: Get a list of clinical illnesses
 *     description: Retrieve a list of clinical illnesses.
 *     tags: [clinicalIllnesses]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "Headache"
 *                 information: "Pain in the head"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
clinicalIllnessRouter.get("/", async (request, response) => {
    try {
        const clinicalIllnesses = await clinicalIllnessService.listClinicalIllnesses();
        return response.status(200).json(clinicalIllnesses);
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /clinical-illnesses/{id}:
 *   get:
 *     summary: Get a single clinical illness by id
 *     description: Retrieve a single clinical illness by its id.
 *     tags: [clinicalIllnesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the clinical illness
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
 *               name: "Headache"
 *               information: "Pain in the head"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Clinical Illness not found
 */
clinicalIllnessRouter.get("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        const clinicalIllness = await clinicalIllnessService.getClinicalIllness(id);

        if (clinicalIllness) {
            return response.status(200).json(clinicalIllness);
        }
        return response.status(404).json("Clinical Illness could not be found");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /clinical-illnesses:
 *   post:
 *     summary: Create a clinical illness
 *     description: Create a new clinical illness.
 *     tags: [clinicalIllnesses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Headache"
 *             information: "Pain in the head"
 *     responses:
 *       201:
 *         description: Clinical Illness created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "Headache"
 *               information: "Pain in the head"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
clinicalIllnessRouter.post(
    "/",
    body("name").isString(),
    body("information").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const clinicalIllness = request.body;
            const newClinicalIllness = await clinicalIllnessService.createClinicalIllness(clinicalIllness);
            return response.status(201).json(newClinicalIllness);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /clinical-illnesses/{id}:
 *   put:
 *     summary: Update a clinical illness
 *     description: Update an existing clinical illness by its id.
 *     tags: [clinicalIllnesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the clinical illness
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "New Clinical Illness Name"
 *             information: "New information about the clinical illness"
 *     responses:
 *       200:
 *         description: Clinical Illness updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "New Clinical Illness Name"
 *               information: "New information about the clinical illness"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Clinical Illness not found
 */
clinicalIllnessRouter.put(
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
            const clinicalIllness = request.body;
            const updatedClinicalIllness = await clinicalIllnessService.updateClinicalIllness(
                clinicalIllness,
                id
            );

            return response.status(200).json(updatedClinicalIllness);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /clinical-illnesses/{id}:
 *   delete:
 *     summary: Delete a clinical illness
 *     description: Delete an existing clinical illness by its id.
 *     tags: [clinicalIllnesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the clinical illness
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Clinical Illness deleted successfully
 *       404:
 *         description: Clinical Illness not found
 */
clinicalIllnessRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        await clinicalIllnessService.deleteClinicalIllness(id);
        return response
            .status(204)
            .json("Clinical Illness has been successfully deleted");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

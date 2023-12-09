import express from "express";
import { body, validationResult } from "express-validator";
import * as formService from "./form.service";

export const formRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: API endpoints related to forms
 */


/**
 * @swagger
 * /forms:
 *   get:
 *     summary: Get a list of forms
 *     description: Retrieve a list of forms.
 *     tags: [Forms]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 form: "Patient Registration Form"
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
formRouter.get("/", async (request, response) => {
    try {
        const forms = await formService.listForms();
        return response.status(200).json(forms);
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /forms/{id}:
 *   get:
 *     summary: Get a single form by id
 *     description: Retrieve a single form by its id.
 *     tags: [Forms]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the form
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
 *               form: "Patient Registration Form"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: Form not found
 */
formRouter.get("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        const form = await formService.getForm(id);

        if (form) {
            return response.status(200).json(form);
        }
        return response.status(404).json("Form could not be found");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /forms:
 *   post:
 *     summary: Create a form
 *     description: Create a new form.
 *     tags: [Forms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             form: "Patient Registration Form"
 *     responses:
 *       201:
 *         description: Form created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               form: "Patient Registration Form"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
formRouter.post(
    "/",
    body("form").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const form = request.body;
            const newForm = await formService.createForm(form);
            return response.status(201).json(newForm);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /forms/{id}:
 *   put:
 *     summary: Update a form
 *     description: Update an existing form by its id.
 *     tags: [Forms]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the form
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             form: "Updated Patient Registration Form"
 *     responses:
 *       200:
 *         description: Form updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               form: "Updated Patient Registration Form"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Form not found
 */
formRouter.put(
    "/:id",
    body("form").isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const form = request.body;
            const updatedForm = await formService.updateForm(
                form,
                id
            );

            return response.status(200).json(updatedForm);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /forms/{id}:
 *   delete:
 *     summary: Delete a form
 *     description: Delete an existing form by its id.
 *     tags: [Forms]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the form
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Form deleted successfully
 *       404:
 *         description: Form not found
 */
formRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    try {
        await formService.deleteForm(id);
        return response
            .status(204)
            .json("Form has been successfully deleted");
    } catch (error) {
        return response.status(500).json(error.message);
    }
});

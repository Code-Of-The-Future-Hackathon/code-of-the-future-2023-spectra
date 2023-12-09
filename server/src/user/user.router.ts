import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import * as userService from './user.service';
import type { Request, Response } from 'express';
import { comparePasswords } from '../utils/auth/hash';
import { generateToken } from '../utils/auth/auth';

export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints related to users
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "john.doe@example.com"
 *                 password: "$2b$10$..."
 *                 createdAt: "2023-01-01T00:00:00Z"
 *                 updatedAt: "2023-01-01T00:00:00Z"
 */
userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const users = await userService.listUsers();
        return response.status(200).json(users);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by id
 *     description: Retrieve a single user by its id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
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
 *               firstName: "John"
 *               lastName: "Doe"
 *               email: "john.doe@example.com"
 *               password: "$2b$10$..."
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const user = await userService.getUser(id);

        if (user) {
            return response.status(200).json(user);
        }
        return response.status(404).json('User could not be found');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Create a new user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: "John"
 *             lastName: "Doe"
 *             email: "john.doe@example.com"
 *             password: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: "John"
 *               lastName: "Doe"
 *               email: "john.doe@example.com"
 *               password: "$2b$10$..."
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 */
userRouter.post(
    '/',
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isString(),
    body('password').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const user = request.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;

            const newUser = await userService.createUser(user);
            return response.status(201).json(newUser);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user by its id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: "Updated John"
 *             lastName: "Updated Doe"
 *             email: "updated.john.doe@example.com"
 *             password: "updated_password123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: "Updated John"
 *               lastName: "Updated Doe"
 *               email: "updated.john.doe@example.com"
 *               password: "$2b$10$..."
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 */
userRouter.put(
    '/:id',
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isString(),
    body('password').isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.id;

        try {
            const user = request.body;
            const updatedUser = await userService.updateUser(user, id);

            return response.status(200).json(updatedUser);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user by its id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        await userService.deleteUser(id);
        return response.status(204).json('User has been successfully deleted');
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "john.doe@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: "John"
 *               lastName: "Doe"
 *               email: "john.doe@example.com"
 *               createdAt: "2023-01-01T00:00:00Z"
 *               updatedAt: "2023-01-01T00:00:00Z"
 *               token: "your-jwt-token"
 *       401:
 *         description: Authentication failed
 */
userRouter.post(
    '/login',
    body('email').isString(),
    body('password').isString(),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { email, password } = request.body;

        try {
            const user = await userService.getUserById(email);

            if (!user) {
                return response.status(401).json('Authentication failed');
            }

            const passwordMatch = await comparePasswords(password, user.password);

            if (!passwordMatch) {
                return response.status(401).json('Authentication failed');
            }

            const token = await generateToken(user.id, user.email + Date.now());
            return response.status(200).json({ ...user, token });
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);
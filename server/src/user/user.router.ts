import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import bcrypt from "bcrypt"
import * as userService from "./user.service"
import { request } from "http"

export const userRouter = express.Router()

//GET: list of all users
userRouter.get("/", async (request: Request, response: Response) => {
    try {
        const users = await userService.listUsers()
        return response.status(200).json(users)
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//GET: a single author by id 
userRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)

    try {
        const user = await userService.getUser(id)

        if (user) {
            return response.status(200).json(user)
        }
        return response.status(404).json("Author could not ne found")
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

//POST: create an user
//params:: fName, lName, email, pass
userRouter.post("/", body("firstName").isString(), body("lastName").isString(),
    body("email").isString(), body("password").isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }

        try {
            const user = request.body

            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(user.password, salt)

            user.password = hashedPassword

            const newUser = await userService.createUser(user)
            return response.status(201).json(newUser)
        }
        catch (error: any) {
            return response.status(500).json(error.message)
        }
    })

//POST: updating an user
//params:: fName, lName, email, pass
userRouter.put("/:id", body("firstName").isString(), body("lastName").isString(),
    body("email").isString(), body("password").isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }

        const id: number = parseInt(request.params.id, 10)

        try {
            const user = request.body
            const updatedUser = await userService.updateUser(user, id)

            return response.status(200).json(updatedUser)
        }
        catch (error: any) {
            return response.status(500).json(error.message)
        }
    })


//DELETE: Delete an author based on the id
userRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)

    try {
        await userService.deleteUser(id)
        return response.status(204).json("Author has been successfully deleted")
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }
})

async function decryptPassword(hashedPassword: string, password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw new Error("Failed to decrypt password")
    }
}
import { db } from "../utils/db.server";

type User = {
    id: string,
    firstName: string,
    lastName: string,
    gender?: string | null,
    age?: number | null,
    imgUrl?: string | null,
    role?: string | null,
    payed?: boolean | null,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

export const listUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            imgUrl: true,
            payed: true,
            age: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        }
    });
};

export const getUser = async (id: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            imgUrl: true,
            payed: true,
            age: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserById = async (email: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            imgUrl: true,
            payed: true,
            age: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const { firstName, lastName, gender,imgUrl,role,payed ,age, email, password, createdAt, updatedAt } = user;
    return db.user.create({
        data: {
            firstName,
            lastName,
            gender,
            imgUrl,
            payed,
            age,
            email,
            password,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            imgUrl: true,
            role: true,
            payed: true,
            age: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUser = async (user: Omit<User, "id">, id: string): Promise<User> => {
    const { firstName, lastName, gender, imgUrl, payed, age, email, password, createdAt, updatedAt } = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            firstName,
            lastName,
            gender,
            imgUrl,
            payed,
            age,
            email,
            password,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            gender: true,
            imgUrl: true,
            role: true,
            payed: true,
            age: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUser = async (id: string): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        },
    });
};
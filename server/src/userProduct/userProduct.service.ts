import { db } from "../utils/db.server";

type UserProduct = {
    id: string;
    userId: string;
    name: string;
    facts: string[];
    advice: string[];
    status: string;
    expert: string;
};

export const listUserProducts = async (): Promise<UserProduct[]> => {
    return db.userProduct.findMany({
        select: {
            id: true,
            userId: true,
            name: true,
            facts: true,
            advice: true,
            status: true,
            expert: true,
        },
    });
};

export const getUserProductById = async (id: string): Promise<UserProduct | null> => {
    return db.userProduct.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            name: true,
            facts: true,
            advice: true,
            status: true,
            expert: true,
        },
    });
};

export const createUserProduct = async (userProduct: Omit<UserProduct, "id">): Promise<UserProduct> => {
    const { userId, name, facts, advice, status, expert } = userProduct;
    return db.userProduct.create({
        data: {
            userId,
            name,
            facts : { 
                set: facts
            },
            advice : {
                set: advice
            },
            status,
            expert,
        },
        select: {
            id: true,
            userId: true,
            name: true,
            facts: true,
            advice: true,
            status: true,
            expert: true,
        },
    });
};

export const updateUserProduct = async (userProduct: Omit<UserProduct, "id">, id: string): Promise<UserProduct> => {
    const { userId, name, facts, advice, status, expert } = userProduct;
    return db.userProduct.update({
        where: {
            id,
        },
        data: {
            userId,
            name,
            facts : { 
                set: facts
            },
            advice : {
                set: advice
            },
            status,
            expert,
        },
        select: {
            id: true,
            userId: true,
            name: true,
            facts: true,
            advice: true,
            status: true,
            expert: true,
        },
    });
};

export const deleteUserProduct = async (id: string): Promise<void> => {
    await db.userProduct.delete({
        where: {
            id,
        },
    });
};

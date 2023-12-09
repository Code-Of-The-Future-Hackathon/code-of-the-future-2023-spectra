import { db } from '../utils/db.server';

type UserProduct = {
    id: string;
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listUserProducts = async (): Promise<UserProduct[]> => {
    return db.userProduct.findMany({
        select: {
            id: true,
            userId: true,
            productId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserProduct = async (
    id: string
): Promise<UserProduct | null> => {
    return db.userProduct.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            productId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUserProduct = async (
    userProduct: Omit<UserProduct, "id">
): Promise<UserProduct> => {
    const { userId, productId, createdAt, updatedAt } = userProduct;
    return db.userProduct.create({
        data: {
            userId,
            productId,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            userId: true,
            productId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserProduct = async (
    userProduct: Omit<UserProduct, "id">,
    id: string
): Promise<UserProduct> => {
    const { userId, productId, createdAt, updatedAt } = userProduct;
    return db.userProduct.update({
        where: {
            id,
        },
        data: {
            userId,
            productId,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            userId: true,
            productId: true,
            createdAt: true,
            updatedAt: true,
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
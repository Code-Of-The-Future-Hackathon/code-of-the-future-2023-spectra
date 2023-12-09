import { db } from "../utils/db.server";

type Category = {
    id: string;
    category: string;
};

export const listCategories = async (): Promise<Category[]> => {
    return db.category.findMany({
        select: {
            id: true,
            category: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getCategory = async (id: string): Promise<Category | null> => {
    return db.category.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            category: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createCategory = async (
    category: Omit<Category, "id">
): Promise<Category> => {
    const { category: categoryName } = category;
    return db.category.create({
        data: {
            category: categoryName,
        },
        select: {
            id: true,
            category: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateCategory = async (
    category: Omit<Category, "id">,
    id: string
): Promise<Category> => {
    const { category: categoryName} = category;
    return db.category.update({
        where: {
            id,
        },
        data: {
            category: categoryName,
        },
        select: {
            id: true,
            category: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteCategory = async (id: string): Promise<void> => {
    await db.category.delete({
        where: {
            id,
        },
    });
};
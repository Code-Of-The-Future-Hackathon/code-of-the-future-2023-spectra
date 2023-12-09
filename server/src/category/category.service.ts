import { db } from "../utils/db.server";

type Category = {
    id: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getCategory = async (id: number): Promise<Category | null> => {
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
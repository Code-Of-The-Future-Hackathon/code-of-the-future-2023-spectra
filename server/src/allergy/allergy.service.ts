import { db } from "../utils/db.server";

type Allergy = {
    id: string;
    name: string;
    information: string;
};

export const listAllergies = async (): Promise<Allergy[]> => {
    return db.allergy.findMany({
        select: {
            id: true,
            name: true,
            information: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getAllergy = async (id: string): Promise<Allergy | null> => {
    return db.allergy.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            information: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createAllergy = async (
    allergy: Omit<Allergy, "id">
): Promise<Allergy> => {
    const { name, information} = allergy;
    return db.allergy.create({
        data: {
            name,
            information,
        },
        select: {
            id: true,
            name: true,
            information: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateAllergy = async (
    allergy: Omit<Allergy, "id">,
    id: string
): Promise<Allergy> => {
    const { name, information} = allergy;
    return db.allergy.update({
        where: {
            id,
        },
        data: {
            name,
            information,
        },
        select: {
            id: true,
            name: true,
            information: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteAllergy = async (id: string): Promise<void> => {
    await db.allergy.delete({
        where: {
            id,
        },
    });
};

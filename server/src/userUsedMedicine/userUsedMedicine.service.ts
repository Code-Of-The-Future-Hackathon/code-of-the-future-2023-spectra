import { db } from "../utils/db.server";

type userUsedMedicine = {
    id: string;
    userId: string;
    medicine: string[];
    createdAt: Date;
    updatedAt: Date;
};

export const listUserUsedMedicines = async (): Promise<userUsedMedicine[]> => {
    return db.userUsedMedicine.findMany({
        select: {
            id: true,
            userId: true,
            medicine: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserUsedMedicine = async (
    id: string
): Promise<userUsedMedicine | null> => {
    return db.userUsedMedicine.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            medicine: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUserUsedMedicine = async (
    userUsedMedicine: Omit<userUsedMedicine, "id">
): Promise<userUsedMedicine> => {
    const { userId, medicine } = userUsedMedicine;
    return db.userUsedMedicine.create({
        data: {
            userId,
            medicine,
        },
        select: {
            id: true,
            userId: true,
            medicine: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserUsedMedicine = async (
    userUsedMedicine: Omit<userUsedMedicine, "id">,
    id: string
): Promise<userUsedMedicine> => {
    const { userId, medicine } = userUsedMedicine;
    return db.userUsedMedicine.update({
        where: {
            id,
        },
        data: {
            userId,
            medicine,
        },
        select: {
            id: true,
            userId: true,
            medicine: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUserUsedMedicine = async (id: string): Promise<void> => {
    await db.userUsedMedicine.delete({
        where: {
            id,
        },
    });
};
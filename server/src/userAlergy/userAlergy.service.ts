import { db } from "../utils/db.server";

type UserAlergy = {
    id: string;
    userId: string;
    allergyId: string;
};

export const listUserAllergies = async (): Promise<UserAlergy[]> => {
    return db.userAlergy.findMany({
        select: {
            id: true,
            userId: true,
            allergyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserAllergy = async (
    id: string
): Promise<UserAlergy | null> => {
    return db.userAlergy.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            allergyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUserAllergy = async (
    userAllergy: Omit<UserAlergy, "id">
): Promise<UserAlergy> => {
    const { userId, allergyId } = userAllergy;
    return db.userAlergy.create({
        data: {
            userId,
            allergyId,
        },
        select: {
            id: true,
            userId: true,
            allergyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserAllergy = async (
    userAllergy: Omit<UserAlergy, "id">,
    id: string
): Promise<UserAlergy> => {
    const { userId, allergyId} = userAllergy;
    return db.userAlergy.update({
        where: {
            id,
        },
        data: {
            userId,
            allergyId,
        },
        select: {
            id: true,
            userId: true,
            allergyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUserAllergy = async (id: string): Promise<void> => {
    await db.userAlergy.delete({
        where: {
            id,
        },
    });
};
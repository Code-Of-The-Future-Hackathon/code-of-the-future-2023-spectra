import { db } from '../utils/db.server';

type UserPreferences = {
    id: number;
    userId: number;
    dosage: string;
    time: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listUserPreferences = async (): Promise<UserPreferences[]> => {
    return db.userPreferences.findMany({
        select: {
            id: true,
            userId: true,
            dosage: true,
            time: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserPreferences = async (id: number): Promise<UserPreferences | null> => {
    return db.userPreferences.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            dosage: true,
            time: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUserPreferences = async (
    userPreferences: Omit<UserPreferences, 'id'>
): Promise<UserPreferences> => {
    const { userId, dosage, time, createdAt, updatedAt } = userPreferences;
    return db.userPreferences.create({
        data: {
            userId,
            dosage,
            time,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            userId: true,
            dosage: true,
            time: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserPreferences = async (
    userPreferences: Omit<UserPreferences, 'id'>,
    id: number
): Promise<UserPreferences> => {
    const { userId, dosage, time, createdAt, updatedAt } = userPreferences;
    return db.userPreferences.update({
        where: {
            id,
        },
        data: {
            userId,
            dosage,
            time,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            userId: true,
            dosage: true,
            time: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUserPreferences = async (id: number): Promise<void> => {
    await db.userPreferences.delete({
        where: {
            id,
        },
    });
};

export default {
    listUserPreferences,
    getUserPreferences,
    createUserPreferences,
    updateUserPreferences,
    deleteUserPreferences,
};

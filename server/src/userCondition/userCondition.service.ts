import { db } from "../utils/db.server";

type userCondition = {
    id: string;
    userId: string;
    conditionId: string;
};

export const listUserConditions = async (): Promise<userCondition[]> => {
    return db.userCondition.findMany({
        select: {
            id: true,
            userId: true,
            conditionId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserCondition = async (
    id: string
): Promise<userCondition | null> => {
    return db.userCondition.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            conditionId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUserCondition = async (
    userCondition: Omit<userCondition, "id">
): Promise<userCondition> => {
    const { userId, conditionId } = userCondition;
    return db.userCondition.create({
        data: {
            userId,
            conditionId,
        },
        select: {
            id: true,
            userId: true,
            conditionId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserCondition = async (
    userCondition: Omit<userCondition, "id">,
    id: string
): Promise<userCondition> => {
    const { userId, conditionId } = userCondition;
    return db.userCondition.update({
        where: {
            id,
        },
        data: {
            userId,
            conditionId,
        },
        select: {
            id: true,
            userId: true,
            conditionId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUserCondition = async (id: string): Promise<void> => {
    await db.userCondition.delete({
        where: {
            id,
        },
    });
};
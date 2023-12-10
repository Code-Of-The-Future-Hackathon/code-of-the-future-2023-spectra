import { db } from "../utils/db.server";

type Condition = {
    id: string;
    alergies: string;
    chronicDiseases: string;
    diseases: string;
};

export const listConditions = async (): Promise<Condition[]> => {
    return db.condition.findMany({
        select: {
            id: true,
            alergies: true,
            chronicDiseases: true,
            diseases: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getCondition = async (id: string): Promise<Condition | null> => {
    return db.condition.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            alergies: true,
            chronicDiseases: true,
            diseases: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createCondition = async (condition: Omit<Condition, 'id'>): Promise<Condition> => {
    const { alergies, chronicDiseases, diseases} = condition;
    return db.condition.create({
        data: {
            alergies,
            chronicDiseases,
            diseases,
        },
        select: {
            id: true,
            alergies: true,
            chronicDiseases: true,
            diseases: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateCondition = async (
    condition: Omit<Condition, 'id'>,
    id: string
): Promise<Condition> => {
    const { alergies, chronicDiseases, diseases} = condition;
    return db.condition.update({
        where: {
            id,
        },
        data: {
            alergies,
            chronicDiseases,
            diseases,
        },
        select: {
            id: true,
            alergies: true,
            chronicDiseases: true,
            diseases: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteCondition = async (id: string): Promise<void> => {
    await db.condition.delete({
        where: {
            id,
        },
    });
};

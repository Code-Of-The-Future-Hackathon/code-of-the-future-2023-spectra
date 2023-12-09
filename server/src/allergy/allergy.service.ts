import { db } from '../utils/db.server';

type Allergy = {
    id: number;
    name: string;
    information: string;
    createdAt: Date;
    updatedAt: Date;
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


export const getAllergyById = async (id: number): Promise<Allergy | null> => {
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

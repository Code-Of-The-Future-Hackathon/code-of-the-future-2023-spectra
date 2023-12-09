import { db } from '../utils/db.server';

type ClynicalIlness = {
    id: number;
    name: string;
    information: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listClynicalIlnesses = async (): Promise<ClynicalIlness[]> => {
    return db.clynicalIlness.findMany({
        select: {
            id: true,
            name: true,
            information: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};


export const getClynicalIlnessById = async (id: number): Promise<ClynicalIlness | null> => {
    return db.clynicalIlness.findUnique({
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

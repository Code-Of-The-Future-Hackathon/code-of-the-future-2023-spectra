import { db } from "../utils/db.server";

type Status = {
    id: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getStatus = async (id: number): Promise<Status | null> => {
    return db.status.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
import { db } from "../utils/db.server";

type Form = {
    id: number;
    form: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getForm = async (id: number): Promise<Form | null> => {
    return db.form.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            form: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
// form.service.ts
import { db } from "../utils/db.server";

type Form = {
    id: string;
    form: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listForms = async (): Promise<Form[]> => {
    return db.form.findMany({
        select: {
            id: true,
            form: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getForm = async (id: string): Promise<Form | null> => {
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

export const createForm = async (form: Omit<Form, "id">): Promise<Form> => {
    const { form: formName, createdAt, updatedAt } = form;
    return db.form.create({
        data: {
            form: formName,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            form: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateForm = async (
    form: Omit<Form, "id">,
    id: string
): Promise<Form> => {
    const { form: formName, createdAt, updatedAt } = form;
    return db.form.update({
        where: {
            id,
        },
        data: {
            form: formName,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            form: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteForm = async (id: string): Promise<void> => {
    await db.form.delete({
        where: {
            id,
        },
    });
};

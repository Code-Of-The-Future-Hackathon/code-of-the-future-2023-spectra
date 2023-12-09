import { db } from "../utils/db.server";

type ClinicalIllness = {
    id: string;
    name: string;
    information: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listClinicalIllnesses = async (): Promise<ClinicalIllness[]> => {
    return db.clinicalIllness.findMany({
        select: {
            id: true,
            name: true,
            information: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getClinicalIllness = async (
    id: string
): Promise<ClinicalIllness | null> => {
    return db.clinicalIllness.findUnique({
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

export const createClinicalIllness = async (
    clinicalIllness: Omit<ClinicalIllness, "id">
): Promise<ClinicalIllness> => {
    const { name, information, createdAt, updatedAt } = clinicalIllness;
    return db.clinicalIllness.create({
        data: {
            name,
            information,
            createdAt,
            updatedAt,
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

export const updateClinicalIllness = async (
    clinicalIllness: Omit<ClinicalIllness, "id">,
    id: string
): Promise<ClinicalIllness> => {
    const { name, information, createdAt, updatedAt } = clinicalIllness;
    return db.clinicalIllness.update({
        where: {
            id,
        },
        data: {
            name,
            information,
            createdAt,
            updatedAt,
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

export const deleteClinicalIllness = async (id: string): Promise<void> => {
    await db.clinicalIllness.delete({
        where: {
            id,
        },
    });
};
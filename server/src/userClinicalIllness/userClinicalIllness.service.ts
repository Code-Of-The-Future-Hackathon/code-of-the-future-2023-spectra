import { db } from '../utils/db.server';

type UserClinicalIllness = {
    id: string;
    userId: string;
    clinicalIllnessId: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listUserClinicalIllnesses = async (): Promise<UserClinicalIllness[]> => {
    return db.userClinicalIllness.findMany({
        select: {
            id: true,
            userId: true,
            clinicalIllnessId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserClinicalIllness = async (
    id: string
): Promise<UserClinicalIllness | null> => {
    return db.userClinicalIllness.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            userId: true,
            clinicalIllnessId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createUserClinicalIllness = async (
    userClinicalIllness: Omit<UserClinicalIllness, "id">
): Promise<UserClinicalIllness> => {
    const { userId, clinicalIllnessId, createdAt, updatedAt } = userClinicalIllness;
    return db.userClinicalIllness.create({
        data: {
            userId,
            clinicalIllnessId,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            userId: true,
            clinicalIllnessId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserClinicalIllness = async (
    userClinicalIllness: Omit<UserClinicalIllness, "id">,
    id: string
): Promise<UserClinicalIllness> => {
    const { userId, clinicalIllnessId, createdAt, updatedAt } = userClinicalIllness;
    return db.userClinicalIllness.update({
        where: {
            id,
        },
        data: {
            userId,
            clinicalIllnessId,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            userId: true,
            clinicalIllnessId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUserClinicalIllness = async (id: string): Promise<void> => {
    await db.userClinicalIllness.delete({
        where: {
            id,
        },
    });
};
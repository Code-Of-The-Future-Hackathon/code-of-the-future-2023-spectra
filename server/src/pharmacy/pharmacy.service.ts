import { db } from '../utils/db.server';

type Pharmacy = {
    id: string;
    name: string;
    openTime: string;
    closeTime: string;
    latitude: number;
    longitude: number;
};

export const listPharmacies = async (): Promise<Pharmacy[]> => {
    return db.pharmacy.findMany({
        select: {
            id: true,
            name: true,
            openTime: true,
            closeTime: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getPharmacy = async (id: string): Promise<Pharmacy | null> => {
    return db.pharmacy.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            openTime: true,
            closeTime: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createPharmacy = async (pharmacy: Omit<Pharmacy, 'id'>): Promise<Pharmacy> => {
    const { name, openTime, closeTime, latitude, longitude} = pharmacy;
    return db.pharmacy.create({
        data: {
            name,
            openTime,
            closeTime,
            latitude,
            longitude,
        },
        select: {
            id: true,
            name: true,
            openTime: true,
            closeTime: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updatePharmacy = async (
    pharmacy: Omit<Pharmacy, 'id'>,
    id: string
): Promise<Pharmacy> => {
    const { name, openTime, closeTime, latitude, longitude} = pharmacy;
    return db.pharmacy.update({
        where: {
            id,
        },
        data: {
            name,
            openTime,
            closeTime,
            latitude,
            longitude,
        },
        select: {
            id: true,
            name: true,
            openTime: true,
            closeTime: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deletePharmacy = async (id: string): Promise<void> => {
    await db.pharmacy.delete({
        where: {
            id,
        },
    });
};

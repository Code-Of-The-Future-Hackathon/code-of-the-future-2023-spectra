import { db } from '../utils/db.server';

type Pharmacy = {
    id: number;
    name: string;
    address: string;
    openTime: string;
    closeTime: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
    updatedAt: Date;
};

export const listPharmacies = async (): Promise<Pharmacy[]> => {
    return db.pharmacy.findMany({
        select: {
            id: true,
            name: true,
            address: true,
            openTime: true,
            closeTime: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getPharmacy = async (id: number): Promise<Pharmacy | null> => {
    return db.pharmacy.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            address: true,
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
    const { name, address, openTime, closeTime, latitude, longitude, createdAt, updatedAt } = pharmacy;
    return db.pharmacy.create({
        data: {
            name,
            address,
            openTime,
            closeTime,
            latitude,
            longitude,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            name: true,
            address: true,
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
    id: number
): Promise<Pharmacy> => {
    const { name, address, openTime, closeTime, latitude, longitude, createdAt, updatedAt } = pharmacy;
    return db.pharmacy.update({
        where: {
            id,
        },
        data: {
            name,
            address,
            openTime,
            closeTime,
            latitude,
            longitude,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            name: true,
            address: true,
            openTime: true,
            closeTime: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deletePharmacy = async (id: number): Promise<void> => {
    await db.pharmacy.delete({
        where: {
            id,
        },
    });
};

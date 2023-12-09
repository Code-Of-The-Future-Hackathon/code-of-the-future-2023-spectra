import { db } from '../utils/db.server';

type ProductPharmacy = {
    id: string;
    productId: string;
    pharmacyId: string;
    createdAt: Date;
    updatedAt: Date;
};

export const listProductPharmacies = async (): Promise<ProductPharmacy[]> => {
    return db.productPharmacy.findMany({
        select: {
            id: true,
            productId: true,
            pharmacyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getProductPharmacy = async (
    id: string
): Promise<ProductPharmacy | null> => {
    return db.productPharmacy.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            productId: true,
            pharmacyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createProductPharmacy = async (
    productPharmacy: Omit<ProductPharmacy, "id">
): Promise<ProductPharmacy> => {
    const { productId, pharmacyId, createdAt, updatedAt } = productPharmacy;
    return db.productPharmacy.create({
        data: {
            productId,
            pharmacyId,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            productId: true,
            pharmacyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateProductPharmacy = async (
    productPharmacy: Omit<ProductPharmacy, "id">,
    id: string
): Promise<ProductPharmacy> => {
    const { productId, pharmacyId, createdAt, updatedAt } = productPharmacy;
    return db.productPharmacy.update({
        where: {
            id,
        },
        data: {
            productId,
            pharmacyId,
            createdAt,
            updatedAt,
        },
        select: {
            id: true,
            productId: true,
            pharmacyId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteProductPharmacy = async (id: string): Promise<void> => {
    await db.productPharmacy.delete({
        where: {
            id,
        },
    });
};
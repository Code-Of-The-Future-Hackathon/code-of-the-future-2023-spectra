
import { db } from "../utils/db.server";

type Product = {
    id: string;
    name: string;
    formId: string;
    imgUrl?: string | null;
    barcode: string;
    sideEffects: string;
    storage: string;
    dosage: string;
    ingredients: string[];
    contradictions: string;
    categoryId: string;
};

export const listProducts = async (): Promise<Product[]> => {
    return db.product.findMany({
        select: {
            id: true,
            name: true,
            formId: true,
            imgUrl: true,
            barcode: true,
            sideEffects: true,
            storage: true,
            dosage: true,
            ingredients: true,
            contradictions: true,
            categoryId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getProduct = async (id: string): Promise<Product | null> => {
    return db.product.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            formId: true,
            imgUrl: true,
            barcode: true,
            sideEffects: true,
            storage: true,
            dosage: true,
            ingredients: true,
            contradictions: true,
            categoryId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const {
        name,
        formId,
        imgUrl,
        barcode,
        sideEffects,
        storage,
        dosage,
        ingredients,
        contradictions,
        categoryId,
    } = product;
    return db.product.create({
        data: {
            name,
            formId,
            imgUrl,
            barcode,
            sideEffects,
            storage,
            dosage,
            ingredients: {
                set: ingredients,
            },
            contradictions,
            categoryId,
        },
        select: {
            id: true,
            name: true,
            formId: true,
            imgUrl: true,
            barcode: true,
            sideEffects: true,
            storage: true,
            dosage: true,
            ingredients: true,
            contradictions: true,
            categoryId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateProduct = async (
    product: Omit<Product, 'id'>,
    id: string
): Promise<Product> => {
    const {
        name,
        formId,
        imgUrl,
        barcode,
        sideEffects,
        storage,
        dosage,
        ingredients,
        contradictions,
        categoryId,
    } = product;
    return db.product.update({
        where: {
            id,
        },
        data: {
            name,
            formId,
            imgUrl,
            barcode,
            sideEffects,
            storage,
            dosage,
            ingredients: {
                set: ingredients,
            },
            contradictions,
            categoryId,
        },
        select: {
            id: true,
            name: true,
            formId: true,
            barcode: true,
            sideEffects: true,
            storage: true,
            dosage: true,
            ingredients: true,
            contradictions: true,
            categoryId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteProduct = async (id: string): Promise<void> => {
    await db.product.delete({
        where: {
            id,
        },
    });
};
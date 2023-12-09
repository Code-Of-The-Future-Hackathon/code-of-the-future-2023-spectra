import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY

export const generateToken = (userId: string, userEmail: string): string => {
    const expiresIn = '1d';

    const token = jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, { expiresIn });

    return token;
};
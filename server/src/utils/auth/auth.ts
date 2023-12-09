import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET_KEY;

export const generateToken = (userId: string, userEmail: string): string => {
    console.log(JWT_SECRET);
    const expiresIn = '1d';

    const token = jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, { expiresIn });

    return token;
};
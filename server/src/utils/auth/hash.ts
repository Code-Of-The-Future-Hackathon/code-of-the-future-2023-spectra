import bcrypt from 'bcrypt';

const saltRounds = 10;

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

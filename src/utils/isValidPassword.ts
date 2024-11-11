const bcrypt = require("bcrypt");

export const isValidPassword = async function (hash: string, password: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        throw error; 
    }
};
const bcrypt = require("bcrypt");

export const hashedPassword = async function (password: string) {
    try {
        const response = await bcrypt.hash(password, 10);
        return response;
    } catch (err) {
        console.error(err);
    }
};
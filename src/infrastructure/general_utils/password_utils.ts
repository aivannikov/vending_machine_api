import bcrypt from 'bcryptjs';

const passwordHash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    return await bcrypt.hash(password, salt);
}

const passwordCompare = async (plainPassword: string, hashPassword:string ) => {
    return await bcrypt.compare(plainPassword, hashPassword);
}

export { passwordHash, passwordCompare }
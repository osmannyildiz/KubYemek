import bcrypt from "bcrypt";

export const hashPassword = async (plaintextPassword: string) => {
	return bcrypt.hash(plaintextPassword, 10);
};

export const checkPasswordWithHash = async (
	plaintextPassword: string,
	hashedPassword: string
) => {
	return bcrypt.compare(plaintextPassword, hashedPassword);
};

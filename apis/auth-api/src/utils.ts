import bcrypt from "bcrypt";

export const hashPassword = async (
	plaintextPassword: string
): Promise<string> => {
	return await bcrypt.hash(plaintextPassword, 10);
};

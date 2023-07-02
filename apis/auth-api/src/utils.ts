import { CONFIG } from "@/config";
import { AdminTokenPayload } from "@core/common/models/auth";
import { Admin } from "@core/common/models/entity/frontend";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (plaintextPassword: string) => {
	return bcrypt.hash(plaintextPassword, 10);
};

export const checkPasswordWithHash = async (
	plaintextPassword: string,
	hashedPassword: string
) => {
	return bcrypt.compare(plaintextPassword, hashedPassword);
};

export const createTokenForAdmin = (admin: Admin) => {
	const payload = new AdminTokenPayload(admin).toPlainObject();
	return jwt.sign(payload, CONFIG.JWT_SECRET, {
		expiresIn: "16h",
	});
};

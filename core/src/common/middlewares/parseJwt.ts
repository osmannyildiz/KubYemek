import { UserTokenPayload } from "@core/common/models/auth";
import { CONFIG } from "@core/services/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type ParseJwtRequestExtension = {
	token?: string;
	tokenPayload?: UserTokenPayload;
};

export const parseJwt = (
	req: Request & ParseJwtRequestExtension,
	res: Response,
	next: NextFunction
) => {
	const token =
		req.headers["authorization"] &&
		req.headers["authorization"].startsWith("Bearer ") &&
		req.headers["authorization"].split(" ").at(1);
	if (!token) {
		return next();
	}

	let payload;
	try {
		payload = jwt.verify(token, CONFIG.JWT_SECRET) as UserTokenPayload;
	} catch (err) {
		return next();
	}

	req.token = token;
	req.tokenPayload = payload;

	return next();
};

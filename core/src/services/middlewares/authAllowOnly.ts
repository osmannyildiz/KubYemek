import { UserTokenPayload, UserType } from "@core/common/models/auth";
import { ErrorType } from "@core/common/models/errors";
import { HttpUnauthorizedResponse } from "@core/common/models/httpResponse";
import { sendHttpResp } from "@core/common/utils";
import { CONFIG } from "@core/services/config";
import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authAllowOnly = (...allowedUserTypes: UserType[]) => {
	return (
		req: Request & { token?: string; tokenPayload?: UserTokenPayload },
		res: Response,
		next: NextFunction
	) => {
		if (req.method === "OPTIONS") {
			return next();
		}

		const token = req.headers["authorization"]?.split(" ")[1];
		if (!token) {
			return sendHttpResp(
				res,
				new HttpUnauthorizedResponse(
					new ServiceErrorResponseBody(ErrorType.loginRequired)
				)
			);
		}
		req.token = token;

		let payload;
		try {
			payload = jwt.verify(token, CONFIG.JWT_SECRET) as UserTokenPayload;
		} catch (err) {
			return sendHttpResp(
				res,
				new HttpUnauthorizedResponse(
					new ServiceErrorResponseBody(ErrorType.loginRequired)
				)
			);
		}
		req.tokenPayload = payload;

		if (!allowedUserTypes.includes(payload.userType)) {
			return sendHttpResp(
				res,
				new HttpUnauthorizedResponse(
					new ServiceErrorResponseBody(ErrorType.notAllowedForUser)
				)
			);
		}

		return next();
	};
};

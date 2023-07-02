import { ParseJwtRequestExtension } from "@core/common/middlewares/parseJwt";
import { UserType } from "@core/common/models/auth";
import { ErrorType } from "@core/common/models/errors";
import { HttpUnauthorizedResponse } from "@core/common/models/httpResponse";
import { sendHttpResp } from "@core/common/utils";
import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import { NextFunction, Request, Response } from "express";

export const authAllowOnly = (...allowedUserTypes: UserType[]) => {
	return (
		req: Request & ParseJwtRequestExtension,
		res: Response,
		next: NextFunction
	) => {
		if (req.method === "OPTIONS") {
			return next();
		}

		if (!req.token || !req.tokenPayload) {
			return sendHttpResp(
				res,
				new HttpUnauthorizedResponse(
					new ServiceErrorResponseBody(ErrorType.loginRequired)
				)
			);
		}

		if (!allowedUserTypes.includes(req.tokenPayload.userType)) {
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

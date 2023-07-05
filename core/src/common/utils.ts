import {
	AdminTokenPayload,
	CustomerTokenPayload,
	UserTokenPayload,
	UserType,
} from "@core/common/models/auth";
import { HttpResponse } from "@core/common/models/httpResponse";
import { Response } from "express";

type Env = "dev-localhost" | "dev-compose" /*| "prod-compose" | "prod-k8s"*/;

const isValidEnv = (env?: string): env is Env =>
	["dev-localhost", "dev-compose" /*, "prod-compose", "prod-k8s"*/].includes(
		env || ""
	);

export const getEnv = (): Env =>
	isValidEnv(process.env.KUBYEMEK_ENV)
		? process.env.KUBYEMEK_ENV
		: "dev-localhost";

export const sendHttpResp = (res: Response, httpResp: HttpResponse) => {
	return httpResp.sendOver(res);
};

export const waitForMs = (ms: number) =>
	new Promise((resolve, reject) => setTimeout(resolve, ms));

export const isAdminTokenPayload = (
	tokenPayload: UserTokenPayload
): tokenPayload is AdminTokenPayload =>
	tokenPayload.userType === UserType.admin;

export const isCustomerTokenPayload = (
	tokenPayload: UserTokenPayload
): tokenPayload is CustomerTokenPayload =>
	tokenPayload.userType === UserType.customer;

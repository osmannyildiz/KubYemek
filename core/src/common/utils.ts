import { HttpResponse } from "@core/common/models/httpResponse";
import { Response } from "express";

type Env = "dev-localhost" | "dev-compose";

const isValidEnv = (env?: string): env is Env =>
	["dev-localhost", "dev-compose"].includes(env || "");

export const getEnv = (): Env =>
	isValidEnv(process.env.KUBYEMEK_ENV)
		? process.env.KUBYEMEK_ENV
		: "dev-localhost";

export const sendHttpResp = (res: Response, httpResp: HttpResponse) => {
	return httpResp.sendOver(res);
};

export const waitForMs = (ms: number) =>
	new Promise((resolve, reject) => setTimeout(resolve, ms));

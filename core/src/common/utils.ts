import { HttpResponse } from "@core/common/models/httpResponse";
import { Response } from "express";

export const snakeToCamel = (str: string) =>
	str.replace(/([_][a-z])/g, (group) => group.replace("_", "").toUpperCase());

export const sendHttpResp = (res: Response, httpResp: HttpResponse) => {
	return httpResp.sendOver(res);
};

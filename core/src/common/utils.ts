import { HttpResponse } from "@core/common/models/httpResponse";
import { Response } from "express";

export const sendHttpResp = (res: Response, httpResp: HttpResponse) => {
	return httpResp.sendOver(res);
};

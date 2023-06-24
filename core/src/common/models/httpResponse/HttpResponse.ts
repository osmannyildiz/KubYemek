import { Response } from "express";
import { ResponseBody } from "../responseBody/ResponseBody";

export class HttpResponse {
	constructor(protected status: number, protected body: ResponseBody) {}

	sendOver(res: Response) {
		return res.status(this.status).json(this.body);
	}
}

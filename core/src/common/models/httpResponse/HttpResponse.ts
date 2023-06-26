import { ApiResponseBody } from "@core/apis/models/responseBody";
import { ServiceResponseBody } from "@core/services/models/responseBody";
import { Response } from "express";

export class HttpResponse {
	constructor(
		protected status: number,
		protected body: ServiceResponseBody | ApiResponseBody
	) {}

	sendOver(res: Response) {
		return res.status(this.status).json(this.body);
	}
}

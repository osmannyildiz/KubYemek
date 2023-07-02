import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import { Response } from "node-fetch";

export class ServiceRespBodyIsNotOkError extends Error {
	constructor(
		public resp: Response,
		public respBody: ServiceErrorResponseBody
	) {
		super();
	}
}

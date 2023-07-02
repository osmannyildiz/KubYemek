import { ApiErrorResponseBody } from "@core/apis/models/responseBody";

export class ApiRespBodyIsNotOkError extends Error {
	constructor(public resp: Response, public respBody: ApiErrorResponseBody) {
		super();
	}
}

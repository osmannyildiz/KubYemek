import { ApiErrorResponseBody } from "@core/apis/models/responseBody";
import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpInternalServerErrorResponse extends HttpResponse {
	constructor(protected body: ServiceErrorResponseBody | ApiErrorResponseBody) {
		super(500, body);
	}
}

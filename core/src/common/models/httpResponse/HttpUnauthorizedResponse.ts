import { ApiErrorResponseBody } from "@core/apis/models/responseBody";
import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpUnauthorizedResponse extends HttpResponse {
	constructor(protected body: ServiceErrorResponseBody | ApiErrorResponseBody) {
		super(401, body);
	}
}

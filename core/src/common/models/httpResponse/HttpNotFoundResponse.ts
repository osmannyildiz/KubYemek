import { ApiErrorResponseBody } from "@core/apis/models/responseBody";
import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpNotFoundResponse extends HttpResponse {
	constructor(protected body: ServiceErrorResponseBody | ApiErrorResponseBody) {
		super(404, body);
	}
}

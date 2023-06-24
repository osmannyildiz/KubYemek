import { ErrorResponseBody } from "../responseBody/ErrorResponseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpBadRequestResponse extends HttpResponse {
	constructor(protected body: ErrorResponseBody) {
		super(400, body);
	}
}

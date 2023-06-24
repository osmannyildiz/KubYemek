import { ErrorResponseBody } from "../responseBody/ErrorResponseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpNotFoundResponse extends HttpResponse {
	constructor(protected body: ErrorResponseBody) {
		super(404, body);
	}
}

import { SuccessResponseBody } from "../responseBody/SuccessResponseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpCreatedResponse extends HttpResponse {
	constructor(protected body: SuccessResponseBody) {
		super(201, body);
	}
}

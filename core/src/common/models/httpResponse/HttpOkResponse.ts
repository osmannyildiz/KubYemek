import { SuccessResponseBody } from "../responseBody/SuccessResponseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpOkResponse extends HttpResponse {
	constructor(protected body: SuccessResponseBody) {
		super(200, body);
	}
}

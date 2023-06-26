import { ApiSuccessResponseBody } from "@core/apis/models/responseBody";
import { ServiceSuccessResponseBody } from "@core/services/models/responseBody";
import { HttpResponse } from "./HttpResponse";

export class HttpOkResponse extends HttpResponse {
	constructor(
		protected body:
			| ServiceSuccessResponseBody<any>
			| ApiSuccessResponseBody<any>
	) {
		super(200, body);
	}
}

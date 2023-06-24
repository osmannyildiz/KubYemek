import { ResponseBody } from "./ResponseBody";

export class ErrorResponseBody extends ResponseBody {
	constructor(public message: string) {
		super(false);
	}
}

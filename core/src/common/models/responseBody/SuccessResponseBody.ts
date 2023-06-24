import { ResponseBody } from "./ResponseBody";

export class SuccessResponseBody extends ResponseBody {
	constructor() {
		super(true);
	}
}

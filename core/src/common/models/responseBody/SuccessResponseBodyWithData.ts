import { SuccessResponseBody } from "./SuccessResponseBody";

export class SuccessResponseBodyWithData<T> extends SuccessResponseBody {
	constructor(public data: T) {
		super();
	}
}

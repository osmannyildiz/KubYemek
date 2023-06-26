import { getErrMsg } from "@core/apis/utils";
import { ErrorType } from "@core/common/models/errors";

export class ApiResponseBody {
	constructor(public ok: boolean) {}
}

export class ApiSuccessResponseBody<T = undefined> extends ApiResponseBody {
	constructor(public data: T) {
		super(true);
	}
}

export class ApiErrorResponseBody extends ApiResponseBody {
	public message: string;

	constructor(public errorType: ErrorType) {
		super(false);
		this.message = getErrMsg(errorType);
	}
}

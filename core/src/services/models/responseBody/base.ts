import { ErrorType } from "@core/common/models/errors";

export class ServiceResponseBody {
	constructor(public ok: boolean) {}
}

export class ServiceSuccessResponseBody<
	T = undefined
> extends ServiceResponseBody {
	constructor(public data?: T) {
		super(true);
	}
}

export class ServiceErrorResponseBody extends ServiceResponseBody {
	constructor(public type: ErrorType) {
		super(false);
	}
}

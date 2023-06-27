import { getErrMsg } from "@core/apis/utils";
import { Entity } from "@core/common/models/entity/frontend";
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

export type ApiGetEntitiesResponseBody<TEntity extends Entity> =
	| ApiSuccessResponseBody<TEntity[]>
	| ApiErrorResponseBody;

export type ApiAddEntityResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiGetEntityResponseBody<TEntity extends Entity> =
	| ApiSuccessResponseBody<TEntity>
	| ApiErrorResponseBody;

export type ApiUpdateEntityResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiDeleteEntityResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

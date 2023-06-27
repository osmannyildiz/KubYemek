import { Entity_Private } from "@core/common/models/entity/backend";
import { ErrorType } from "@core/common/models/errors";

export class ServiceResponseBody {
	constructor(public ok: boolean) {}
}

export class ServiceSuccessResponseBody<
	T = undefined
> extends ServiceResponseBody {
	constructor(public data: T) {
		super(true);
	}
}

export class ServiceErrorResponseBody extends ServiceResponseBody {
	constructor(public errorType: ErrorType) {
		super(false);
	}
}

export type ServiceGetEntitiesResponseBody<TPrivEntity extends Entity_Private> =
	ServiceSuccessResponseBody<TPrivEntity[]> | ServiceErrorResponseBody;

export type ServiceAddEntityResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceGetEntityResponseBody<TPrivEntity extends Entity_Private> =
	| ServiceSuccessResponseBody<TPrivEntity>
	| ServiceErrorResponseBody;

export type ServiceUpdateEntityResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceDeleteEntityResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

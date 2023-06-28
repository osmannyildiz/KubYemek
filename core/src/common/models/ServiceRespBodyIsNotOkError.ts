import { ErrorType } from "@core/common/models/errors";

export class ServiceRespBodyIsNotOkError extends Error {
	constructor(public errorType: ErrorType) {
		super();
	}
}

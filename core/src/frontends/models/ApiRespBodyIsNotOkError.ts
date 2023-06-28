import { ErrorType } from "@core/common/models/errors";

export class ApiRespBodyIsNotOkError extends Error {
	constructor(public errorType: ErrorType) {
		super();
	}
}

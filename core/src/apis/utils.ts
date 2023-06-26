import { CONFIG } from "@core/apis/config";
import { errorMessages } from "@core/common/constants/errorMessages";
import { ErrorType } from "@core/common/models/errors";
import {
	ServiceErrorResponseBody,
	ServiceResponseBody,
} from "@core/services/models/responseBody";

export function serviceRespBodyIsNotOk(
	respBody: ServiceResponseBody
): respBody is ServiceErrorResponseBody {
	return !respBody.ok;
}

export function getErrMsg(errorType: ErrorType) {
	return errorMessages[errorType][CONFIG.LANG_ID];
}

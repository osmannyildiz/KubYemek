import { CONFIG } from "@/config";
import {
	ApiErrorResponseBody,
	ApiResponseBody,
} from "@core/apis/models/responseBody";
import { errorMessages } from "@core/common/constants/errorMessages";
import { ErrorType } from "@core/common/models/errors";

export function apiRespBodyIsNotOk(
	respBody: ApiResponseBody
): respBody is ApiErrorResponseBody {
	return !respBody.ok;
}

export function getErrMsg(errorType: ErrorType) {
	return errorMessages[errorType][CONFIG.LANG_ID];
}

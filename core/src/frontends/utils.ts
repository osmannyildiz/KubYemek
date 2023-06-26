import {
	ApiErrorResponseBody,
	ApiResponseBody,
} from "@core/apis/models/responseBody";

export function apiRespBodyIsNotOk(
	respBody: ApiResponseBody
): respBody is ApiErrorResponseBody {
	return !respBody.ok;
}

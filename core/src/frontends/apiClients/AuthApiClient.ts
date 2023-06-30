import { ApiRegisterAdminRequestBody } from "@core/apis/models/requestBody";
import { ApiRegisterAdminResponseBody } from "@core/apis/models/responseBody";
import { CONFIG } from "@core/frontends/config";
import { ApiRespBodyIsNotOkError } from "@core/frontends/models/ApiRespBodyIsNotOkError";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";

export class AuthApiClient {
	static async registerAdmin(data: ApiRegisterAdminRequestBody) {
		const resp = await fetch(`${CONFIG.AUTH_API_ADDRESS}/admins/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiRegisterAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}
}

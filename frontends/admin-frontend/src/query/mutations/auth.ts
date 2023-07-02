import {
	ApiLoginAdminRequestBody,
	ApiRegisterAdminRequestBody,
} from "@core/apis/models/requestBody";
import { AuthApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const registerAdmin: MutationFunction<
	void,
	{ authApiClient: AuthApiClient; data: ApiRegisterAdminRequestBody }
> = async ({ authApiClient, data }) => {
	await authApiClient.registerAdmin(data);
};

export const loginAdmin: MutationFunction<
	string,
	{ authApiClient: AuthApiClient; data: ApiLoginAdminRequestBody }
> = async ({ authApiClient, data }) => {
	return await authApiClient.loginAdmin(data);
};

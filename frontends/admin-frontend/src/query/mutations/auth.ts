import {
	ApiLoginAdminRequestBody,
	ApiRegisterAdminRequestBody,
} from "@core/apis/models/requestBody";
import { AuthApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const registerAdmin: MutationFunction<
	void,
	{ data: ApiRegisterAdminRequestBody }
> = async (payload) => {
	await AuthApiClient.registerAdmin(payload.data);
};

export const loginAdmin: MutationFunction<
	string,
	{ data: ApiLoginAdminRequestBody }
> = async (payload) => {
	return await AuthApiClient.loginAdmin(payload.data);
};

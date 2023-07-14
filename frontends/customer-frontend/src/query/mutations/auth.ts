import {
	ApiChangeCustomerPasswordRequestBody,
	ApiLoginCustomerRequestBody,
	ApiRegisterCustomerRequestBody,
} from "@core/apis/models/requestBody";
import { AuthApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const register: MutationFunction<
	void,
	{ authApiClient: AuthApiClient; data: ApiRegisterCustomerRequestBody }
> = async ({ authApiClient, data }) => {
	await authApiClient.registerCustomer(data);
};

export const login: MutationFunction<
	string,
	{ authApiClient: AuthApiClient; data: ApiLoginCustomerRequestBody }
> = async ({ authApiClient, data }) => {
	return await authApiClient.loginCustomer(data);
};

export const changePassword: MutationFunction<
	void,
	{ authApiClient: AuthApiClient; data: ApiChangeCustomerPasswordRequestBody }
> = async ({ authApiClient, data }) => {
	await authApiClient.changeCustomerPassword(data);
};

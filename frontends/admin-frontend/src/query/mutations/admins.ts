import {
	ApiAddAdminRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const addAdmin: MutationFunction<
	void,
	{ data: ApiAddAdminRequestBody }
> = async (payload) => {
	await AdminApiClient.addAdmin(payload.data);
};

export const updateAdmin: MutationFunction<
	void,
	{ id: number; data: ApiUpdateAdminRequestBody }
> = async (payload) => {
	await AdminApiClient.updateAdmin(payload.id, payload.data);
};

export const deleteAdmin: MutationFunction<void, { id: number }> = async (
	payload
) => {
	await AdminApiClient.deleteAdmin(payload.id);
};

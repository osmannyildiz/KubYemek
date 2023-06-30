import { ApiUpdateAdminRequestBody } from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

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

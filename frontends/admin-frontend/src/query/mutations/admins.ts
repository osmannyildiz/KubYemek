import { ApiUpdateAdminRequestBody } from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const updateAdmin: MutationFunction<
	void,
	{
		adminApiClient: AdminApiClient;
		id: number;
		data: ApiUpdateAdminRequestBody;
	}
> = async ({ adminApiClient, id, data }) => {
	await adminApiClient.updateAdmin(id, data);
};

export const deleteAdmin: MutationFunction<
	void,
	{ adminApiClient: AdminApiClient; id: number }
> = async ({ adminApiClient, id }) => {
	await adminApiClient.deleteAdmin(id);
};

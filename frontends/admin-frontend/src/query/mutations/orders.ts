import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const cancelOrder: MutationFunction<
	void,
	{
		adminApiClient: AdminApiClient;
		id: number;
	}
> = async ({ adminApiClient, id }) => {
	await adminApiClient.cancelOrder(id);
};

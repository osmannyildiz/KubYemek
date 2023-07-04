import { ApiAddToCustomerPointsRequestBody } from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const addToCustomerPoints: MutationFunction<
	void,
	{
		adminApiClient: AdminApiClient;
		id: number;
		data: ApiAddToCustomerPointsRequestBody;
	}
> = async ({ adminApiClient, id, data }) => {
	await adminApiClient.addToCustomerPoints(id, data);
};

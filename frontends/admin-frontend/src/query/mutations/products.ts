import { ApiProduceProductRequestBody } from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const addProduct: MutationFunction<
	void,
	{ adminApiClient: AdminApiClient; data: FormData }
> = async ({ adminApiClient, data }) => {
	await adminApiClient.addProduct(data);
};

export const updateProduct: MutationFunction<
	void,
	{ adminApiClient: AdminApiClient; id: number; data: FormData }
> = async ({ adminApiClient, id, data }) => {
	await adminApiClient.updateProduct(id, data);
};

export const deleteProduct: MutationFunction<
	void,
	{ adminApiClient: AdminApiClient; id: number }
> = async ({ adminApiClient, id }) => {
	await adminApiClient.deleteProduct(id);
};

export const produceProduct: MutationFunction<
	void,
	{
		adminApiClient: AdminApiClient;
		id: number;
		data: ApiProduceProductRequestBody;
	}
> = async ({ adminApiClient, id, data }) => {
	await adminApiClient.produceProduct(id, data);
};

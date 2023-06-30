import { ApiProduceProductRequestBody } from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const addProduct: MutationFunction<void, { data: FormData }> = async (
	payload
) => {
	await AdminApiClient.addProduct(payload.data);
};

export const updateProduct: MutationFunction<
	void,
	{ id: number; data: FormData }
> = async (payload) => {
	await AdminApiClient.updateProduct(payload.id, payload.data);
};

export const deleteProduct: MutationFunction<void, { id: number }> = async (
	payload
) => {
	await AdminApiClient.deleteProduct(payload.id);
};

export const produceProduct: MutationFunction<
	void,
	{ id: number; data: ApiProduceProductRequestBody }
> = async (payload) => {
	await AdminApiClient.produceProduct(payload.id, payload.data);
};

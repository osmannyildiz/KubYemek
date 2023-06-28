import {
	ApiAddProductRequestBody,
	ApiUpdateProductRequestBody,
} from "@core/apis/models/requestBody";
import { AdminApiClient } from "@core/frontends/apiClients";
import { MutationFunction } from "react-query";

export const addProduct: MutationFunction<
	void,
	{ data: ApiAddProductRequestBody }
> = async (payload) => {
	await AdminApiClient.addProduct(payload.data);
};

export const updateProduct: MutationFunction<
	void,
	{ id: number; data: ApiUpdateProductRequestBody }
> = async (payload) => {
	await AdminApiClient.updateProduct(payload.id, payload.data);
};

export const deleteProduct: MutationFunction<void, { id: number }> = async (
	payload
) => {
	await AdminApiClient.deleteProduct(payload.id);
};

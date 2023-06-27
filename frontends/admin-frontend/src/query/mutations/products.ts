import {
	ApiAddProductRequestBody,
	ApiUpdateProductRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddProductResponseBody,
	ApiDeleteProductResponseBody,
	ApiUpdateProductResponseBody,
} from "@core/apis/models/responseBody";
import { MutationFunction } from "react-query";

export const addProduct: MutationFunction<
	ApiAddProductResponseBody,
	{ body: ApiAddProductRequestBody }
> = async (payload) => {
	const resp = await fetch("http://localhost:8080/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload.body),
	});
	const respData = await resp.json();
	return respData;
};

export const updateProduct: MutationFunction<
	ApiUpdateProductResponseBody,
	{ id: number; body: ApiUpdateProductRequestBody }
> = async (payload) => {
	const resp = await fetch(`http://localhost:8080/products/${payload.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload.body),
	});
	const respData = await resp.json();
	return respData;
};

export const deleteProduct: MutationFunction<
	ApiDeleteProductResponseBody,
	{ id: number }
> = async (payload) => {
	const resp = await fetch(`http://localhost:8080/products/${payload.id}`, {
		method: "DELETE",
	});
	const respData = await resp.json();
	return respData;
};

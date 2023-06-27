import {
	ApiGetProductResponseBody,
	ApiGetProductsResponseBody,
} from "@core/apis/models/responseBody";

export const getProducts = async (): Promise<ApiGetProductsResponseBody> => {
	const resp = await fetch("http://localhost:8080/products");
	const respData = await resp.json();
	return respData;
};

export const getProduct = async (
	productId: number
): Promise<ApiGetProductResponseBody> => {
	const resp = await fetch(`http://localhost:8080/products/${productId}`);
	const respData = await resp.json();
	return respData;
};

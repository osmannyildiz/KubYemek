import { Product } from "@core/common/models/entity/frontend";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getProducts = async (): Promise<Product[]> => {
	return await AdminApiClient.getProducts();
};

export const getProduct = async (productId: number): Promise<Product> => {
	return await AdminApiClient.getProduct(productId);
};

import { Product } from "@core/common/models/entity/frontend";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getProducts = async (
	adminApiClient: AdminApiClient
): Promise<Product[]> => {
	return await adminApiClient.getProducts();
};

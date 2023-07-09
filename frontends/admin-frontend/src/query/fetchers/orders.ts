import { IOrderDto } from "@core/common/models/entity/dto/OrderDto";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getOrders = async (
	adminApiClient: AdminApiClient
): Promise<IOrderDto[]> => {
	return await adminApiClient.getOrders();
};

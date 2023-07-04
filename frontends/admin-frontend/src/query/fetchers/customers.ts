import { Customer } from "@core/common/models/entity/frontend";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getCustomers = async (
	adminApiClient: AdminApiClient
): Promise<Customer[]> => {
	return await adminApiClient.getCustomers();
};

import { AdminNotification } from "@core/common/models/entity/frontend";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getNotifications = async (
	adminApiClient: AdminApiClient
): Promise<AdminNotification[]> => {
	return await adminApiClient.getNotifications();
};

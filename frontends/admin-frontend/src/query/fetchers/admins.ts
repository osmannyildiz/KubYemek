import { Admin } from "@core/common/models/entity/frontend";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getAdmins = async (
	adminApiClient: AdminApiClient
): Promise<Admin[]> => {
	return await adminApiClient.getAdmins();
};

// export const getAdmin = async (
// 	adminApiClient: AdminApiClient,
// 	adminId: number
// ): Promise<Admin> => {
// 	return await adminApiClient.getAdmin(adminId);
// };

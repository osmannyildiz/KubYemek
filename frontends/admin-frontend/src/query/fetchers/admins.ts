import { Admin } from "@core/common/models/entity/frontend";
import { AdminApiClient } from "@core/frontends/apiClients";

export const getAdmins = async (): Promise<Admin[]> => {
	return await AdminApiClient.getAdmins();
};

// export const getAdmin = async (adminId: number): Promise<Admin> => {
// 	return await AdminApiClient.getAdmin(adminId);
// };

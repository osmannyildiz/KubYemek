import {
	ApiGetAdminResponseBody,
	ApiGetAdminsResponseBody,
} from "@core/apis/models/responseBody";

export const getAdmins = async (): Promise<ApiGetAdminsResponseBody> => {
	const resp = await fetch("http://localhost:8080/admins");
	const respData = await resp.json();
	return respData;
};

export const getAdmin = async (
	adminId: number
): Promise<ApiGetAdminResponseBody> => {
	const resp = await fetch(`http://localhost:8080/admins/${adminId}`);
	const respData = await resp.json();
	return respData;
};

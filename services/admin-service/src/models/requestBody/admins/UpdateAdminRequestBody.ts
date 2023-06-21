import type { UpdateEntityRequestBody } from "../UpdateEntityRequestBody";

export interface UpdateAdminRequestBody extends UpdateEntityRequestBody {
	email?: string;
	password?: string;
}

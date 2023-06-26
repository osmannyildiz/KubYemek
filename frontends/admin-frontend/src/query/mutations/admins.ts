import {
	ApiAddAdminRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddAdminResponseBody,
	ApiDeleteAdminResponseBody,
	ApiUpdateAdminResponseBody,
} from "@core/apis/models/responseBody";
import { MutationFunction } from "react-query";

export const addAdmin: MutationFunction<
	ApiAddAdminResponseBody,
	{ body: ApiAddAdminRequestBody }
> = async (payload) => {
	const resp = await fetch("http://localhost:8080/admins", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload.body),
	});
	const respData = await resp.json();
	return respData;
};

export const updateAdmin: MutationFunction<
	ApiUpdateAdminResponseBody,
	{ id: number; body: ApiUpdateAdminRequestBody }
> = async (payload) => {
	const resp = await fetch(`http://localhost:8080/admins/${payload.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload.body),
	});
	const respData = await resp.json();
	return respData;
};

export const deleteAdmin: MutationFunction<
	ApiDeleteAdminResponseBody,
	{ id: number }
> = async (payload) => {
	const resp = await fetch(`http://localhost:8080/admins/${payload.id}`, {
		method: "DELETE",
	});
	const respData = await resp.json();
	return respData;
};

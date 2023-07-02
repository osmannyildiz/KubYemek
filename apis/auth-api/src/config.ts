import { CONFIG as CORE_APIS_CONFIG } from "@core/apis/config";

export const CONFIG = {
	...CORE_APIS_CONFIG,
	PORT: process.env.PORT || 8081,
};

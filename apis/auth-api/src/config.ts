import { AuthApiConfig } from "@/models/configs";
import { CONFIG as CORE_APIS_CONFIG } from "@core/apis/config";
import { SECRETS } from "./secrets";

export const CONFIG: AuthApiConfig = {
	...SECRETS,
	...CORE_APIS_CONFIG,
	PORT: +(process.env.PORT || 8081),
};

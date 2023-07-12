import { CORE_APIS_CONFIG } from "@core/apis/config";
import { getEnv } from "@core/common/utils";

const env = getEnv();

export const CONFIG = {
	...CORE_APIS_CONFIG,
	PORT: {
		"dev-localhost": 8083,
		"dev-compose": 80,
	}[env],
};

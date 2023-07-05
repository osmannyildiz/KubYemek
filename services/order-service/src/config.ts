import { getEnv } from "@core/common/utils";
import { CORE_SERVICES_CONFIG } from "@core/services/config";

const env = getEnv();

export const CONFIG = {
	...CORE_SERVICES_CONFIG,
	PORT: {
		"dev-localhost": 8005,
		"dev-compose": 80,
	}[env],
};

import { CONFIG as CORE_SERVICES_CONFIG } from "@core/services/config";

export const CONFIG = {
	...CORE_SERVICES_CONFIG,
	PORT: process.env.PORT || 8007,
};

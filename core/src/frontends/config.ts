import { LangId } from "@core/common/models/localization";
import { getEnv } from "@core/common/utils";
import { ICoreFrontendsConfig } from "@core/frontends/models/configs";

const env = getEnv();

export const CORE_FRONTENDS_CONFIG: ICoreFrontendsConfig = {
	LANG_ID: LangId.tr,
	AUTH_API_ADDRESS: {
		"dev-localhost": "http://localhost:8081",
		"dev-compose": "http://auth-api",
	}[env],
	ADMIN_API_ADDRESS: {
		"dev-localhost": "http://localhost:8082",
		"dev-compose": "http://admin-api",
	}[env],
	CUSTOMER_API_ADDRESS: {
		"dev-localhost": "http://localhost:8083",
		"dev-compose": "http://customer-api",
	}[env],
};

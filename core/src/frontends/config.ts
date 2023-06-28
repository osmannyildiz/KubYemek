import { CoreFrontendsConfig } from "@core/common/models/configs";
import { LangId } from "@core/common/models/localization";

export const CONFIG: CoreFrontendsConfig = {
	LANG_ID: LangId.tr,
	AUTH_API_ADDRESS: process.env.AUTH_API_ADDRESS || "http://localhost:8081",
	ADMIN_API_ADDRESS: process.env.ADMIN_API_ADDRESS || "http://localhost:8082",
	CUSTOMER_API_ADDRESS:
		process.env.CUSTOMER_API_ADDRESS || "http://localhost:8083",
};

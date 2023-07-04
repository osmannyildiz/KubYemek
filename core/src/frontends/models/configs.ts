import { LangId } from "@core/common/models/localization";

export interface ICoreFrontendsConfig {
	LANG_ID: LangId;
	AUTH_API_ADDRESS: string;
	ADMIN_API_ADDRESS: string;
	CUSTOMER_API_ADDRESS: string;
}

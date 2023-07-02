import { LangId } from "@core/common/models/localization";

export interface CoreApisSecrets {
	JWT_SECRET: string;
}

export interface CoreApisConfig extends CoreApisSecrets {
	LANG_ID: LangId;
	ADMIN_SERVICE_ADDRESS: string;
	CUSTOMER_SERVICE_ADDRESS: string;
	DELIVERY_SERVICE_ADDRESS: string;
	NOTIFICATION_SERVICE_ADDRESS: string;
	ORDER_SERVICE_ADDRESS: string;
	PAYMENT_SERVICE_ADDRESS: string;
	PRODUCT_SERVICE_ADDRESS: string;
}

import { LangId } from "@core/common/models/localization";

export interface CoreServicesSecrets {
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
}
export interface CoreServicesConfig extends CoreServicesSecrets {
	DB_NAME: string;
	AWS_REGION: string;
}

export interface CoreApisConfig {
	LANG_ID: LangId;
	ADMIN_SERVICE_ADDRESS: string;
	CUSTOMER_SERVICE_ADDRESS: string;
	DELIVERY_SERVICE_ADDRESS: string;
	NOTIFICATION_SERVICE_ADDRESS: string;
	ORDER_SERVICE_ADDRESS: string;
	PAYMENT_SERVICE_ADDRESS: string;
	PRODUCT_SERVICE_ADDRESS: string;
}

export interface CoreFrontendsConfig {
	LANG_ID: LangId;
	AUTH_API_ADDRESS: string;
	ADMIN_API_ADDRESS: string;
	CUSTOMER_API_ADDRESS: string;
}

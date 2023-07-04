import { ICoreApisConfig } from "@core/apis/models/configs";
import { LangId } from "@core/common/models/localization";
import { getEnv } from "@core/common/utils";
import { CORE_APIS_SECRETS } from "./secrets";

const env = getEnv();

export const CORE_APIS_CONFIG: ICoreApisConfig = {
	...CORE_APIS_SECRETS,
	LANG_ID: LangId.tr,
	ADMIN_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8001",
		"dev-compose": "http://admin-service",
	}[env],
	CUSTOMER_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8002",
		"dev-compose": "http://customer-service",
	}[env],
	DELIVERY_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8003",
		"dev-compose": "http://delivery-service",
	}[env],
	NOTIFICATION_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8004",
		"dev-compose": "http://notification-service",
	}[env],
	ORDER_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8005",
		"dev-compose": "http://order-service",
	}[env],
	PAYMENT_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8006",
		"dev-compose": "http://payment-service",
	}[env],
	PRODUCT_SERVICE_ADDRESS: {
		"dev-localhost": "http://localhost:8007",
		"dev-compose": "http://product-service",
	}[env],
};

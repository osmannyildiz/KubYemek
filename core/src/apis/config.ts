import { CoreApisConfig } from "@core/apis/models/configs";
import { SECRETS } from "@core/apis/secrets";
import { LangId } from "@core/common/models/localization";

export const CONFIG: CoreApisConfig = {
	...SECRETS,
	LANG_ID: LangId.tr,
	ADMIN_SERVICE_ADDRESS:
		process.env.ADMIN_SERVICE_ADDRESS || "http://localhost:8001",
	CUSTOMER_SERVICE_ADDRESS:
		process.env.CUSTOMER_SERVICE_ADDRESS || "http://localhost:8002",
	DELIVERY_SERVICE_ADDRESS:
		process.env.DELIVERY_SERVICE_ADDRESS || "http://localhost:8003",
	NOTIFICATION_SERVICE_ADDRESS:
		process.env.NOTIFICATION_SERVICE_ADDRESS || "http://localhost:8004",
	ORDER_SERVICE_ADDRESS:
		process.env.ORDER_SERVICE_ADDRESS || "http://localhost:8005",
	PAYMENT_SERVICE_ADDRESS:
		process.env.PAYMENT_SERVICE_ADDRESS || "http://localhost:8006",
	PRODUCT_SERVICE_ADDRESS:
		process.env.PRODUCT_SERVICE_ADDRESS || "http://localhost:8007",
};

import { ICoreServicesConfig } from "@core/services/models/configs";
import { CORE_SERVICES_SECRETS } from "./secrets";

export const CORE_SERVICES_CONFIG: ICoreServicesConfig = {
	...CORE_SERVICES_SECRETS,
	DB_NAME: "kubyemek",
	AWS_REGION: "eu-north-1",
};

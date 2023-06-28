import { CoreServicesConfig } from "@core/common/models/configs";
import { SECRETS } from "./secrets";

export const CONFIG: CoreServicesConfig = {
	...SECRETS,
	DB_NAME: "kubyemek",
};

import { SECRETS } from "./secrets";

export const CONFIG = {
	...SECRETS,
	PORT: process.env.PORT || 8000,
	DB_NAME: "kubyemek",
};

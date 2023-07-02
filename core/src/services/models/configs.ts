export interface CoreServicesSecrets {
	JWT_SECRET: string;
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

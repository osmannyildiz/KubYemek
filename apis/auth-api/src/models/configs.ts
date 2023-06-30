export interface AuthApiSecrets {
	JWT_SECRET: string;
}
export interface AuthApiConfig extends AuthApiSecrets {
	PORT: number;
}

import { CONFIG } from "@/config";
import { MysqlDbconnFactory } from "@core/services/lib/dbpkg/databases/mysql";
import { DbCustomersRepository } from "./DbCustomersRepository";

export const dbconnFactory = new MysqlDbconnFactory({
	host: CONFIG.DB_HOST,
	port: CONFIG.DB_PORT,
	username: CONFIG.DB_USERNAME,
	password: CONFIG.DB_PASSWORD,
	databaseName: CONFIG.DB_NAME,
});

export const db = {
	customers: () =>
		new DbCustomersRepository(dbconnFactory.createDbconnGetter()),
};

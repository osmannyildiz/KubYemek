import { CONFIG } from "@/config";
import { MysqlDbconnFactory } from "@core/services/lib/dbpkg/databases/mysql";
import { DbProductsRepository } from "./DbProductsRepository";

export const dbconnFactory = new MysqlDbconnFactory({
	host: CONFIG.DB_HOST,
	port: CONFIG.DB_PORT,
	username: CONFIG.DB_USERNAME,
	password: CONFIG.DB_PASSWORD,
	databaseName: CONFIG.DB_NAME,
});

export const db = {
	products: () => new DbProductsRepository(dbconnFactory.createDbconnGetter()),
};

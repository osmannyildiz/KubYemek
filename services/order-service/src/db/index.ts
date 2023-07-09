import { CONFIG } from "@/config";
import { MysqlDbconnFactory } from "@core/services/lib/dbpkg/databases/mysql";
import { DbCustomersRepository } from "@core/services/repositories/DbCustomersRepository";
import { DbProductsRepository } from "@core/services/repositories/DbProductsRepository";
import { DbOrderProductsRepository } from "./DbOrderProductsRepository";
import { DbOrdersRepository } from "./DbOrdersRepository";

export const dbconnFactory = new MysqlDbconnFactory({
	host: CONFIG.DB_HOST,
	port: CONFIG.DB_PORT,
	username: CONFIG.DB_USERNAME,
	password: CONFIG.DB_PASSWORD,
	databaseName: CONFIG.DB_NAME,
});

export const db = {
	orders: () => new DbOrdersRepository(dbconnFactory.createDbconnGetter()),
	customers: () =>
		new DbCustomersRepository(dbconnFactory.createDbconnGetter()),
	orderProducts: () =>
		new DbOrderProductsRepository(dbconnFactory.createDbconnGetter()),
	products: () => new DbProductsRepository(dbconnFactory.createDbconnGetter()),
};

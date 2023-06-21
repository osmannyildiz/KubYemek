import { CONFIG } from "../config";
import { MysqlDbconnFactory } from "./../../lib/dbpkg/databases/mysql";
import { DbAdminsRepository } from "./DbAdminsRepository";

export const dbconnFactory = new MysqlDbconnFactory({
	host: CONFIG.DB_HOST,
	port: CONFIG.DB_PORT,
	username: CONFIG.DB_USERNAME,
	password: CONFIG.DB_PASSWORD,
	databaseName: CONFIG.DB_NAME,
});

export const db = {
	admins: () => new DbAdminsRepository(dbconnFactory.createDbconnGetter()),
};

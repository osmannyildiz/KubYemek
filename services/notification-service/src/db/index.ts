import { CONFIG } from "@/config";
import { MysqlDbconnFactory } from "@core/services/lib/dbpkg/databases/mysql";
import { DbAdminNotificationsRepository } from "./DbAdminNotificationsRepository";
import { DbCustomerNotificationsRepository } from "./DbCustomerNotificationsRepository";

export const dbconnFactory = new MysqlDbconnFactory({
	host: CONFIG.DB_HOST,
	port: CONFIG.DB_PORT,
	username: CONFIG.DB_USERNAME,
	password: CONFIG.DB_PASSWORD,
	databaseName: CONFIG.DB_NAME,
});

export const db = {
	adminNotifications: () =>
		new DbAdminNotificationsRepository(dbconnFactory.createDbconnGetter()),
	customerNotifications: () =>
		new DbCustomerNotificationsRepository(dbconnFactory.createDbconnGetter()),
};

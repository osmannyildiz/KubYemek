import mysql from "mysql2/promise";
import { DbconnConfig, MysqlDbconn } from "../types";

export class MysqlDbconnFactory {
	constructor(private config: DbconnConfig) {}

	async createDbconn(): Promise<MysqlDbconn> {
		const dbconn = await mysql.createConnection({
			host: this.config.host,
			port: this.config.port || 3306,
			user: this.config.username,
			password: this.config.password,
			database: this.config.databaseName,
		});
		return dbconn;
	}

	createDbconnGetter() {
		return async () => await this.createDbconn();
	}
}

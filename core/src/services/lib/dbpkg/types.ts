import mysql from "mysql2/promise";

export type MysqlDbconn = mysql.Connection;
export type Dbconn = MysqlDbconn;

export type DbconnGetter = () => Promise<Dbconn>;

export type Value = string | number | boolean | null;

export interface DbconnConfig {
	host: string;
	port?: number;
	username: string;
	password: string;
	databaseName?: string;
}

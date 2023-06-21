CREATE DATABASE kubyemek;
USE kubyemek;

CREATE TABLE admins (
	id						INT				NOT NULL AUTO_INCREMENT,
	email					VARCHAR(255)	NOT NULL UNIQUE,
	password				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id)
);

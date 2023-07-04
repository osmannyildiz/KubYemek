CREATE DATABASE kubyemek;
USE kubyemek;
START TRANSACTION;

CREATE TABLE admins (
	id						INT				NOT NULL AUTO_INCREMENT,
	username				VARCHAR(255)	NOT NULL UNIQUE,
	email					VARCHAR(255)	NOT NULL UNIQUE,
	hashed_password			VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE customers (
	id						INT				NOT NULL AUTO_INCREMENT,
	email					VARCHAR(255)	NOT NULL UNIQUE,
	hashed_password			VARCHAR(255)	NOT NULL,
	name					VARCHAR(255)	NOT NULL,
	surname					VARCHAR(255)	NOT NULL,
	delivery_address		TEXT			NOT NULL,
	birth_date				DATE			NOT NULL,
	points					INT				NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE products (
	id						INT				NOT NULL AUTO_INCREMENT,
	name					VARCHAR(255)	NOT NULL,
	slug					VARCHAR(255)	NOT NULL UNIQUE,
	unit_of_sale			VARCHAR(255)	NOT NULL,
	price					INT				NOT NULL,
	units_in_stock			INT				NOT NULL DEFAULT 0,
	image_url				TEXT			NOT NULL,
	PRIMARY KEY (id)
);

COMMIT;

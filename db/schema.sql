CREATE DATABASE kubyemek;
USE kubyemek;

CREATE TABLE admins (
	id						INT				NOT NULL AUTO_INCREMENT,
	email					VARCHAR(255)	NOT NULL UNIQUE,
	password				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE products (
	id						INT				NOT NULL AUTO_INCREMENT,
	name					VARCHAR(255)	NOT NULL,
	slug					VARCHAR(255)	NOT NULL UNIQUE,
	unit_of_sale			VARCHAR(255)	NOT NULL,
	price					INT				NOT NULL,
	units_in_stock			INT				NOT NULL DEFAULT 0,
	image_url				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id)
);

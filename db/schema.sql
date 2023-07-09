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

CREATE TABLE orders (
	id						INT				NOT NULL AUTO_INCREMENT,
	customer_id				INT				NOT NULL,
	code					VARCHAR(255)	NOT NULL UNIQUE,
	created_at				DATETIME		NOT NULL,
	status					VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE order_products (
	id						INT				NOT NULL AUTO_INCREMENT,
	order_id				INT				NOT NULL,
	product_id				INT				NOT NULL,
	unit_count				INT				NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

COMMIT;

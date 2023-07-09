USE kubyemek;
START TRANSACTION;

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

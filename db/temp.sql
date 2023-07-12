USE kubyemek;
START TRANSACTION;

CREATE TABLE admin_notifications (
	id						INT				NOT NULL AUTO_INCREMENT,
	created_at				DATETIME		NOT NULL,
	kind					VARCHAR(255)	NOT NULL,
	title					VARCHAR(255)	NOT NULL,
	description				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE customer_notifications (
	id						INT				NOT NULL AUTO_INCREMENT,
	customer_id				INT				NOT NULL,
	created_at				DATETIME		NOT NULL,
	kind					VARCHAR(255)	NOT NULL,
	title					VARCHAR(255)	NOT NULL,
	description				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE
);

COMMIT;

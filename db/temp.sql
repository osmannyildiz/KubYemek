USE kubyemek;
START TRANSACTION;

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

COMMIT;

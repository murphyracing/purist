DROP TABLE IF EXISTS purchases.purchaseGroup;

CREATE TABLE IF NOT EXISTS purchases.purchaseGroup (
	id SERIAL PRIMARY KEY,
	label TEXT NOT NULL
);

INSERT INTO purchases.purchaseGroup (label) VALUES
	('INC'),
	('R&D'),
	('SHP');

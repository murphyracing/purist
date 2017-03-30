DROP TABLE IF EXISTS purchases.signalType;

CREATE TABLE IF NOT EXISTS purchases.signalType (
	id SERIAL PRIMARY KEY,
	label TEXT NOT NULL
);

INSERT INTO purchases.signalType (label) VALUES
	('counted'), 
	('requested'),
	('ordered'),
	('incoming'),
	('received');

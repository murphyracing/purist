DROP TABLE IF EXISTS public.signaltype;

CREATE TABLE IF NOT EXISTS public.signaltype (
	id serial primary key,
	signaltype text not null
);

INSERT INTO signaltype (signaltype) VALUES
	('counted'), 
	('requested'),
	('ordered'),
	('incoming'),
	('received');

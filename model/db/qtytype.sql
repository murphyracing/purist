DROP TABLE IF EXISTS public.qtyType;

CREATE TABLE IF NOT EXISTS public.qtyType (
	id serial primary key,
	qtyType text not null
);

INSERT INTO qtyType (qtyType) VALUES
	('need'),
	('remaining'),
	('promised');

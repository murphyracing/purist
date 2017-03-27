DROP TABLE IF EXISTS public.qtytype;

CREATE TABLE IF NOT EXISTS public.qtytype (
	id serial primary key,
	qtytype text not null
);

INSERT INTO qtytype (qtytype) VALUES
	('need'),
	('remaining'),
	('promised');

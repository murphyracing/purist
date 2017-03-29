DROP TABLE IF EXISTS public.partdomain;

CREATE TABLE public.partdomain (
	id SERIAL PRIMARY KEY,
	name NOT NULL TEXT
);

DROP INDEX IF EXISTS ux_partdomain_name;
CREATE UNIQUE INDEX ux_partdomain_name ON public.partdomain (name);

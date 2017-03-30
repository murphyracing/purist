DROP TABLE IF EXISTS public.partDomain;

CREATE TABLE public.partDomain (
	id SERIAL PRIMARY KEY,
	label TEXT NOT NULL
);

DROP INDEX IF EXISTS ux_partdomain_name;
CREATE UNIQUE INDEX ux_partdomain_name ON public.partDomain (name);

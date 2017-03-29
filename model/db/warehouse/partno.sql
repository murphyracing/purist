DROP TABLE IF EXISTS public.partno;

CREATE TABLE public.partno (
	id SERIAL PRIMARY KEY,
	domain_id NOT NULL INTEGER REFERENCES partdomain (id),
	partno NOT NULL TEXT
);

DROP INDEX IF EXISTS ux_partno;
CREATE UNIQUE INDEX ux_partno ON public.partno (domain_id, partno);

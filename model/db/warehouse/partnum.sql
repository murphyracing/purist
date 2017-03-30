DROP TABLE IF EXISTS public.partNum;

CREATE TABLE public.partNum (
	id SERIAL PRIMARY KEY,
	domainId NOT NULL INTEGER REFERENCES partDomain (id),
	n NOT NULL TEXT
);

DROP INDEX IF EXISTS ux_partnum;
CREATE UNIQUE INDEX ux_partnum ON public.partNum (domainId, n);

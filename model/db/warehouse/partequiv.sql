DROP TABLE IF EXISTS public.partequiv;

CREATE TABLE public.partequiv (
	id SERIAL PRIMARY KEY,
	a_id NOT NULL INT REFERENCES partNum (id),
	b_id NOT NULL INT REFERENCES partNum (id)
);

DROP INDEX IF EXISTS ux_partequiv_a_b;
CREATE UNIQUE INDEX ux_partequiv_a_b ON public.partequiv (a_id, b_id);

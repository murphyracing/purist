DROP TABLE IF EXISTS public.part;

CREATE TABLE public.part (
	id SERIAL PRIMARY KEY,
	partno_id NOT NULL INTEGER REFERENCES public.partno (id)
);

DROP INDEX IF EXISTS ux_part_partno_id;
CREATE UNIQUE INDEX ux_part_partno_id ON public.part (partno_id);

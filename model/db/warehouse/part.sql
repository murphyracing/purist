DROP TABLE IF EXISTS public.part;

CREATE TABLE public.part (
	id SERIAL PRIMARY KEY,
	partNumId NOT NULL INTEGER REFERENCES public.partNum (id)
);

DROP INDEX IF EXISTS ux_part_partno_id;
CREATE UNIQUE INDEX ux_part_partno_id ON public.part (partNumId);

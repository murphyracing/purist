DROP TABLE IF EXISTS public.binassignment;

CREATE TABLE public.binassignment (
    id SERIAL PRIMARY KEY,
    "timestamp" NOT NULL TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc'),
    bin_id NOT NULL INT REFERENCES public.bin (id),
    partno_id NOT NULL INT REFERENCES public.partno (id)
);

DROP INDEX IF EXISTS ix_binassignment_bin_id;
CREATE INDEX ix_binassignment_bin_id ON public.binassignment (bin_id);

DROP INDEX IF EXISTS ix_binassignment_partno_id;
CREATE INDEX ix_binassignment_partno_id ON public.binassignment (partno_id);

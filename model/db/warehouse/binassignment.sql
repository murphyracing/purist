DROP TABLE IF EXISTS public.binAssignment;

CREATE TABLE public.binAssignment (
    id SERIAL PRIMARY KEY,
    "timestamp" NOT NULL TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc'),
    binId NOT NULL INT REFERENCES public.bin (id),
    partNumId NOT NULL INT REFERENCES public.partNum (id)
);

DROP INDEX IF EXISTS ix_binassignment_bin_id;
CREATE INDEX ix_binassignment_bin_id ON public.binAssignment (binId);

DROP INDEX IF EXISTS ix_binassignment_partno_id;
CREATE INDEX ix_binassignment_partno_id ON public.binAssignment (partNumId);

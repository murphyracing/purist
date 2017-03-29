DROP TABLE IF EXISTS public.bin;

CREATE TABLE public.bin (
    id SERIAL PRIMARY KEY,
    "group_id" NOT NULL INT REFERENCES bingroup (id),
    number NOT NULL INT
);

DROP INDEX IF EXISTS ux_bin_group_label;
CREATE UNIQUE INDEX ux_bin_group_label ON public.bin ("group_id", number);

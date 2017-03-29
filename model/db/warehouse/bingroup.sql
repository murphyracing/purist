DROP TABLE IF EXISTS public.bingroup;

CREATE TABLE public.bingroup (
    id SERIAL PRIMARY KEY,
    label NOT NULL TEXT
);

DROP INDEX IF EXISTS ux_bingroup_label;
CREATE UNIQUE INDEX ux_bingroup_label ON public.bingroup (label);

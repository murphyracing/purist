DROP TABLE IF EXISTS public.supplier;

CREATE TABLE public.supplier (
    id SERIAL PRIMARY KEY,
    name NOT NULL TEXT
);

DROP INDEX IF EXISTS ux_supplier_name;
CREATE UNIQUE INDEX ux_supplier_name ON public.supplier (name);

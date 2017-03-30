DROP TABLE IF EXISTS public.customer;

CREATE TABLE public.customer (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL
);

DROP INDEX IF EXISTS ux_customer_label;
CREATE UNIQUE INDEX ux_customer_label ON public.customer (label);

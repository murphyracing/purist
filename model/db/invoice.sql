DROP TABLE IF EXISTS public.invoice;

CREATE TABLE public.invoice (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL
);

DROP INDEX IF EXISTS ux_invoice_label;
CREATE UNIQUE INDEX ux_invoice_label ON public.invoice (label);

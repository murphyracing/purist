DROP TABLE IF EXISTS public.supplierdomain;

CREATE TABLE public.supplierdomain (
    id SERIAL PRIMARY KEY,
    supplier_id NOT NULL INT REFERENCES public.supplier (id),
    domain_id NOT NULL INT REFERENCES public.partdomain (id)
);

DROP INDEX IF EXISTS ux_supplierdomain;
CREATE UNIQUE INDEX ux_supplierdomain ON public.supplierdomain (supplier_id, domain_id);

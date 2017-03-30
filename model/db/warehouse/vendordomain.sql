DROP TABLE IF EXISTS public.vendorDomain;

CREATE TABLE public.vendorDomain (
    id SERIAL PRIMARY KEY,
    vendorId NOT NULL INT REFERENCES public.vendor (id),
    domainId NOT NULL INT REFERENCES public.partDomain (id)
);

DROP INDEX IF EXISTS ux_vendordomain;
CREATE UNIQUE INDEX ux_vendordomain ON public.vendorDomain (vendorId, domainId);

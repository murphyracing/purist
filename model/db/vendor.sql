DROP TABLE IF EXISTS public.vendor;

CREATE TABLE public.vendor (
	id SERIAL PRIMARY KEY,
	label TEXT NOT NULL
);

DROP INDEX IF EXISTS ux_vendor_label;
CREATE UNIQUE INDEX ux_vendor_label ON public.vendor (label);

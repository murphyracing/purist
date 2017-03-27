DROP TABLE IF EXISTS public.signal;

CREATE TABLE IF NOT EXISTS public.signal (
	id serial PRIMARY KEY,
	date date DEFAULT CURRENT_DATE NOT NULL,
	signaltype_id integer NOT NULL REFERENCES public.signaltype (id),
	subject text,
	qtytype_id integer DEFAULT 1 not null references public.qtytype (id),
	qty integer,
	ponum_id integer not null references public.ponum (id),
	vendor_id integer not null references public.vendor (id),
	tracking text
);

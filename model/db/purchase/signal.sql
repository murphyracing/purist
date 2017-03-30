DROP TABLE IF EXISTS purchases.signal;

CREATE TABLE IF NOT EXISTS purchases.signal (
	id serial PRIMARY KEY,
	date date DEFAULT CURRENT_DATE NOT NULL,
	signalTypeId integer NOT NULL REFERENCES purchases.signalType (id),
	subject text,
	qtyTypeId integer DEFAULT 1 not null references purchases.qtyType (id),
	qty integer,
	purchaseNumId integer not null references purchases.purchaseNum (id),
	vendorId integer not null references public.vendor (id),
	tracking text
);

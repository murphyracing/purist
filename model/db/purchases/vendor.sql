DROP TABLE IF EXISTS public.vendor;

CREATE TABLE IF NOT EXISTS public.vendor (
	id serial primary key,
	business_name text not null
);

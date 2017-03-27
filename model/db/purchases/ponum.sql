DROP TABLE IF EXISTS public.ponum;

CREATE TABLE IF NOT EXISTS public.ponum (
	id serial primary key,
	group_id integer not null references public.ponum_group (id),
	member integer not null
);

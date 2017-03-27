DROP TABLE IF EXISTS public.ponum_group;

CREATE TABLE IF NOT EXISTS public.ponum_group (
	id serial primary key,
	"group" text not null
);

INSERT INTO ponum_group ("group") VALUES
	('inc'),
	('r&d'),
	('shop');

DROP TABLE IF EXISTS purchases.purchaseNum;

CREATE TABLE IF NOT EXISTS purchases.purchaseNum (
	id serial primary key,
	groupId integer not null references purchases.purchaseGroup (id),
	member integer not null
);

DROP INDEX IF EXISTS ux_purchasenum;
CREATE UNIQUE INDEX ux_purchasenum ON purchases.purchaseNum (groupId, member);

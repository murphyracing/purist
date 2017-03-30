DROP TABLE IF EXISTS pay.ccType;
CREATE TABLE pay.ccType (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL
);

DROP INDEX IF EXISTS ux_cctype_label;
CREATE UNIQUE INDEX ux_cctype_label ON pay.ccType (label);
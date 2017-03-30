DROP TABLE IF EXISTS pay.check;
CREATE TABLE pay.check (
  id SERIAL PRIMARY KEY,
  number INT NOT NULL
);

DROP INDEX IF EXISTS ux_check_number;
CREATE UNIQUE INDEX ux_check_number ON pay.check (number);
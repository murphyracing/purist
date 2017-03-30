DROP TABLE IF EXISTS pay.paymentMethod;
CREATE TABLE pay.paymentMethod (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL
);

DROP INDEX IF EXISTS ux_paymentmethod_label;
CREATE UNIQUE INDEX ux_paymentmethod_label ON pay.paymentMethod (label);

DROP TABLE IF EXISTS pay.payment;
CREATE TABLE pay.payment
(
    id SERIAL PRIMARY KEY,
    payableId INT NOT NULL REFERENCES pay.payable (id),
    amount MONEY NOT NULL,
    checkId INT REFERENCES pay.check (id),
    ccLastFour INT,
    ccTypeId INT REFERENCES pay.ccType (id)
);
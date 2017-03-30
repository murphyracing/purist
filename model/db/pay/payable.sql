DROP TABLE IF EXISTS pay.payable;
CREATE TABLE pay.payable (
    id SERIAL PRIMARY KEY,
    vendorId INT REFERENCES public.vendor (id),
    customerId INT REFERENCES public.customer (id),
    -- vendor invoice if bill payment
    -- RMA # if customer refund
    invoiceId INT REFERENCES public.invoice (id),
    amount MONEY NOT NULL,
    methodId INT NOT NULL REFERENCES pay.paymentMethod (id),
    approvedOn DATE
);

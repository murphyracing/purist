SELECT 
	signal.date, 
	signaltype.signaltype, 
	qtytype.qtytype, 
	signal.qty, 
	signal.subject,
	ponum_group.group,
	ponum.member,
	vendor.business_name,
	signal.tracking
FROM signal
JOIN signaltype ON signal.signaltype_id = signaltype.id
JOIN qtytype ON signal.qtytype_id = qtytype.id
JOIN ponum  ON signal.ponum_id = ponum.id
JOIN ponum_group ON ponum.group_id = ponum_group.id
JOIN vendor ON signal.vendor_id = vendor.id
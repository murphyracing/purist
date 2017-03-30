SELECT 
	signal.date, 
	signalType.signalType,
	qtyType.qtyType,
	signal.qty, 
	signal.subject,
	purchaseGroup.group,
	purchaseNum.member,
	vendor.label,
	signal.tracking
FROM purchases.signal
JOIN purchases.signalType ON purchases.signal.signalTypeId = purchases.signalType.id
JOIN qtyType ON signal.qtyTypeId = public.qtyType.id
JOIN purchaseNum  ON signal.purchaseNumId = purchaseNum.id
JOIN purchaseGroup ON purchaseNum.groupId = purchaseGroup.id
JOIN vendor ON signal.vendorId = vendor.id

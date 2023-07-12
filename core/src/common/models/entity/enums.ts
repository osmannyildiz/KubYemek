export enum OrderStatus {
	inPayment = "inPayment",
	paymentFailed = "paymentFailed",
	inPreparation = "inPreparation",
	canceledByCustomer = "canceledByCustomer",
	canceledByAdmin = "canceledByAdmin",
	inDelivery = "inDelivery",
	deliveryFailed = "deliveryFailed",
	fulfilled = "fulfilled",
}

export enum NotificationKind {
	info = "info",
	success = "success",
	warning = "warning",
}

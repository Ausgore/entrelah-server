export enum OrderStatus {
	Active = 0,
	Delivered = 1,
	Completed = 2,
	Cancelled = 3
}

export enum OrderEventType {
	Delivered = 0,
	Message = 1,
	Completed = 2,
	BuyerReviewed = 3,
	SellerReviewed = 4
}
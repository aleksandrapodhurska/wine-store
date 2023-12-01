export interface CartItem {
	productId: {name?: string, _id: string, category?: string};
	name?: string;
	quantity: number;
	price: number;
	discount?: number;
	total: number;

	createdAt?: string;
	updatedAt?: string;
}

export interface Cart {
	_id?: string;
	items: [] | CartItem[];
	subtotal: number;
	owner: string;
	
	createdAt?: string;
	updatedAt?: string;
}

export interface ProductToCart {
	userId?: string;
	productId: string;
	quantity: number;
}
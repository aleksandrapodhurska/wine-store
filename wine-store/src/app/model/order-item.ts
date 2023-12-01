export interface Order {
	created?: Date;
	cart: string;
	subtotal: number;
	owner: string;
	payment: string;
	delivery?: {
		address?: {
			city: string;
			street: string;
		},
		date?: {
			_id: string | null;
		}
		// date: string;
		// time: string;
	},
}
export interface DeliverySlot {
	_id?: string;
	date: string;
	time: {
		startTime: string;
		endTime: string;
	}
	owner?: string;
	order?: string;
}
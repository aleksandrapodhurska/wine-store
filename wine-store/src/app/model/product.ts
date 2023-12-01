export interface Product {
    _id?: string;
	name: string;
    category: string;
    subcategory: string;
    image: string;
    price: number;
    stock: number;
    unit: string;
    description?: string;
    shortDescription?: string;
}

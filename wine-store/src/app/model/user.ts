export interface User {
	firstName: string;
	familyName: string;
	username: string;
	password: string;
	role: "user" | "admin";
	idCard: string;
	address: {
		city: string,
		street: string
	};
	orders?: string[];
	cart?: string;
}

export interface LoginData {
	username: string;
	password: string;
}
export interface SelectItem {
	label: string;
	value: string;
}

export interface UserPurchaseInfo {
	firstName: string;
	familyName: string;
	username: string;
	role: string | "user" | "admin";
	idCard: string;
	address: {
		city: string,
		street: string
	};
	orders?: string[];
	cart?: string;
}
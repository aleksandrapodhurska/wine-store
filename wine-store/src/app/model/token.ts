export interface Token {
	user: string;
	refreshToken: string;
}

export interface UserData {
    accessToken: string;
    refreshToken: string;
    user: {
        username: string;
        id: string;
        role: "user" | "admin" | "";
    };
    newUser?: boolean;
}

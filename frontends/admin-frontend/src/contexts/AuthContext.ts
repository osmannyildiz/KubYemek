import { IAdminTokenPayload } from "@core/common/models/auth";
import { buildContext } from "@core/frontends/utils";
import jwt_decode from "jwt-decode";
import { useState } from "react";

interface IAuthContext {
	token?: string;
	isLoggedIn: boolean;
	username?: string;
	isAutoLoginAttempted: boolean;
	login: (token: string) => void;
	logout: () => void;
	tryAutoLogin: () => boolean;
}

export const [AuthContext, useAuthContext] = buildContext<IAuthContext>();

export function buildAuthContextValue(): IAuthContext {
	/* eslint-disable-next-line react-hooks/rules-of-hooks */
	const [token, setToken] = useState<string>();

	/* eslint-disable-next-line react-hooks/rules-of-hooks */
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	/* eslint-disable-next-line react-hooks/rules-of-hooks */
	const [username, setUsername] = useState<string>();

	/* eslint-disable-next-line react-hooks/rules-of-hooks */
	const [isAutoLoginAttempted, setIsAutoLoginAttempted] = useState(false);

	const login = (token: string, remember: boolean = true) => {
		const tokenPayload = jwt_decode<IAdminTokenPayload>(token);
		setToken(token);
		setIsLoggedIn(true);
		setUsername(tokenPayload.adminUsername);

		if (remember) {
			localStorage.setItem("token", token);
		}
	};

	const logout = () => {
		setToken(undefined);
		setIsLoggedIn(false);
		setUsername(undefined);

		localStorage.removeItem("token");
	};

	const tryAutoLogin = () => {
		const savedToken = localStorage.getItem("token");
		if (savedToken) {
			login(savedToken, false);
			setIsAutoLoginAttempted(true);
			return true;
		}

		setIsAutoLoginAttempted(true);
		return false;
	};

	// /* eslint-disable-next-line react-hooks/rules-of-hooks */
	// useEffect(() => {
	// 	const foo = setInterval(() => setIsAutoLoginAttempted((val) => !val), 2000);
	// 	return () => {
	// 		clearInterval(foo);
	// 	};
	// }, [token]);

	return {
		token,
		isLoggedIn,
		username,
		isAutoLoginAttempted,
		login,
		logout,
		tryAutoLogin,
	};
}

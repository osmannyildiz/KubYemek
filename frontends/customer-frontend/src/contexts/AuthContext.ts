import { ICustomerTokenPayload } from "@core/common/models/auth";
import { buildContext } from "@core/frontends/utils";
import jwt_decode from "jwt-decode";
import { useState } from "react";

interface IAuthContext {
	token?: string;
	isLoggedIn: boolean;
	tokenPayload?: ICustomerTokenPayload;
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
	const [tokenPayload, setTokenPayload] = useState<ICustomerTokenPayload>();

	/* eslint-disable-next-line react-hooks/rules-of-hooks */
	const [isAutoLoginAttempted, setIsAutoLoginAttempted] = useState(false);

	const login = (token: string, remember: boolean = true) => {
		const tokenPayload = jwt_decode<ICustomerTokenPayload>(token);
		setToken(token);
		setIsLoggedIn(true);
		setTokenPayload(tokenPayload);

		if (remember) {
			localStorage.setItem("token", token);
		}
	};

	const logout = () => {
		setToken(undefined);
		setIsLoggedIn(false);
		setTokenPayload(undefined);

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

	return {
		token,
		isLoggedIn,
		tokenPayload,
		isAutoLoginAttempted,
		login,
		logout,
		tryAutoLogin,
	};
}

import {
	ApiErrorResponseBody,
	ApiResponseBody,
} from "@core/apis/models/responseBody";
import { errorMessages } from "@core/common/constants/errorMessages";
import { ErrorType } from "@core/common/models/errors";
import { CORE_FRONTENDS_CONFIG } from "@core/frontends/config";
import { createContext, useContext } from "react";

const moneyFormatter = new Intl.NumberFormat("tr", {
	style: "currency",
	currency: "TRY",
});

export function apiRespBodyIsNotOk(
	respBody: ApiResponseBody
): respBody is ApiErrorResponseBody {
	return !respBody.ok;
}

export function getErrMsg(errorType: ErrorType) {
	return errorMessages[errorType][CORE_FRONTENDS_CONFIG.LANG_ID];
}

export function formatPriceForDisplay(priceRaw: number | string) {
	return moneyFormatter.format(+priceRaw / 100);
}

export function buildContext<TContext>(): [
	React.Context<TContext | null>,
	() => TContext
] {
	const builtContext = createContext<TContext | null>(null);

	const builtUseContext = () => {
		const contextInstance = useContext(builtContext);
		if (contextInstance === null) {
			throw new Error(
				"You can use this hook only inside the context's provider."
			);
		}
		return contextInstance;
	};

	return [builtContext, builtUseContext];
}

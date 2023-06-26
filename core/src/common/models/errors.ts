import { LangId } from "./localization";

export enum ErrorType {
	default,
	emailAlreadyExists,
	notFound,
	requiredFieldEmpty,
}

export type ErrorMessages = Record<ErrorType, LocalizedErrorMessageGroup>;

type LocalizedErrorMessageGroup = Record<LangId, string>;

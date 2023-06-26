import { LangId } from "./localization";

export enum ErrorType {
	default = "default",
	emailAlreadyExists = "emailAlreadyExists",
	notFound = "notFound",
	passwordShouldSatisfyMinimumLength = "passwordShouldSatisfyMinimumLength",
	passwordsDoNotMatch = "passwordsDoNotMatch",
	requiredFieldEmpty = "requiredFieldEmpty",
}

export type ErrorMessages = Record<ErrorType, LocalizedErrorMessageGroup>;

type LocalizedErrorMessageGroup = Record<LangId, string>;

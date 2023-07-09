import { LangId } from "./localization";

export enum ErrorType {
	default = "default",
	currentPasswordIsIncorrect = "currentPasswordIsIncorrect",
	emailAlreadyExists = "emailAlreadyExists",
	fieldMustBeOneOrBigger = "fieldMustBeOneOrBigger",
	loginIsInvalid = "loginIsInvalid",
	loginRequired = "loginRequired",
	notAllowedForUser = "notAllowedForUser",
	notFound = "notFound",
	orderAlreadyCanceled = "orderAlreadyCanceled",
	passwordShouldSatisfyMinimumLength = "passwordShouldSatisfyMinimumLength",
	passwordsDoNotMatch = "passwordsDoNotMatch",
	requiredFieldEmpty = "requiredFieldEmpty",
	usernameAlreadyExists = "usernameAlreadyExists",
}

export type ErrorMessages = Record<ErrorType, LocalizedErrorMessageGroup>;

type LocalizedErrorMessageGroup = Record<LangId, string>;

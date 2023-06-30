import { LangId } from "./localization";

export enum ErrorType {
	default = "default",
	emailAlreadyExists = "emailAlreadyExists",
	fieldMustBeOneOrBigger = "fieldMustBeOneOrBigger",
	notFound = "notFound",
	passwordShouldSatisfyMinimumLength = "passwordShouldSatisfyMinimumLength",
	passwordsDoNotMatch = "passwordsDoNotMatch",
	requiredFieldEmpty = "requiredFieldEmpty",
}

export type ErrorMessages = Record<ErrorType, LocalizedErrorMessageGroup>;

type LocalizedErrorMessageGroup = Record<LangId, string>;

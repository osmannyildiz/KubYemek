import { ErrorMessages, ErrorType } from "@core/common/models/errors";

export const errorMessages: ErrorMessages = {
	[ErrorType.default]: {
		en: "An error occurred.",
		tr: "Bir hata oluştu.",
	},
	[ErrorType.emailAlreadyExists]: {
		en: "A user with this e-mail address already exists. Please enter a different e-mail address.",
		tr: "Bu e-posta adresine sahip bir kullanıcı halihazırda mevcut. Lütfen farklı bir e-posta adresi girin.",
	},
	[ErrorType.notFound]: {
		en: "Data not found.",
		tr: "Veri bulunamadı.",
	},
	[ErrorType.requiredFieldEmpty]: {
		en: "Please fill all required fields.",
		tr: "Lütfen tüm zorunlu alanları doldurun.",
	},
};

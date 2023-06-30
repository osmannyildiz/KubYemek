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
	[ErrorType.fieldMustBeOneOrBigger]: {
		en: "This field's value must be 1 or bigger.",
		tr: "Bu alanın değeri 1 veya daha büyük olmalıdır.",
	},
	[ErrorType.loginIsInvalid]: {
		en: "Login credentials are invalid.",
		tr: "Giriş bilgileri yanlış.",
	},
	[ErrorType.notFound]: {
		en: "Data not found.",
		tr: "Veri bulunamadı.",
	},
	[ErrorType.passwordShouldSatisfyMinimumLength]: {
		en: "Password should be at least 6 characters long.",
		tr: "Şifre en az 6 karakter uzunluğunda olmalıdır.",
	},
	[ErrorType.passwordsDoNotMatch]: {
		en: "Entered passwords do not match.",
		tr: "Girilen şifreler uyuşmuyor.",
	},
	[ErrorType.requiredFieldEmpty]: {
		en: "Please fill all required fields.",
		tr: "Lütfen tüm zorunlu alanları doldurun.",
	},
};

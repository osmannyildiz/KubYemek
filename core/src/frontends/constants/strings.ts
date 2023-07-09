import { LocalizedStringGroup } from "@core/common/models/constants";
import { OrderStatus } from "@core/common/models/entity/enums";

export const orderStatuses: Record<OrderStatus, LocalizedStringGroup> = {
	[OrderStatus.inPayment]: {
		en: "⏳ In payment",
		tr: "⏳ Ödemede",
	},
	[OrderStatus.paymentFailed]: {
		en: "❌ Payment failed",
		tr: "❌ Ödeme başarısız oldu",
	},
	[OrderStatus.inPreparation]: {
		en: "⏳ In preparation",
		tr: "⏳ Hazırlanıyor",
	},
	[OrderStatus.canceledByCustomer]: {
		en: "❌ Canceled by customer",
		tr: "❌ Müşteri tarafından iptal edildi",
	},
	[OrderStatus.canceledByAdmin]: {
		en: "❌ Canceled by KubYemek",
		tr: "❌ KubYemek tarafından iptal edildi",
	},
	[OrderStatus.inDelivery]: {
		en: "⏳ In delivery",
		tr: "⏳ Teslimatta",
	},
	[OrderStatus.deliveryFailed]: {
		en: "❌ Delivery failed",
		tr: "❌ Teslimat başarısız oldu",
	},
	[OrderStatus.fulfilled]: {
		en: "✅ Delivered",
		tr: "✅ Teslim edildi",
	},
};

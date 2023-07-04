import { Customer_Private } from "@core/common/models/entity/backend";
import { Customer } from "@core/common/models/entity/frontend";

export class CustomerAdapter {
	static privateToPublic(privCustomer: Customer_Private): Customer {
		return {
			id: privCustomer.id,
			email: privCustomer.email,
			name: privCustomer.name,
			surname: privCustomer.surname,
			deliveryAddress: privCustomer.delivery_address,
			birthDate: privCustomer.birth_date,
			points: privCustomer.points,
		};
	}
}

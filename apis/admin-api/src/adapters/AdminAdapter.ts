import { Admin_Private } from "@core/common/models/entity/backend";
import { Admin } from "@core/common/models/entity/frontend";

export class AdminAdapter {
	static privateToPublic(privAdmin: Admin_Private): Admin {
		return {
			id: privAdmin.id,
			username: privAdmin.username,
			email: privAdmin.email,
		};
	}
}

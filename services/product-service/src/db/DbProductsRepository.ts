import { Product_Private } from "@core/common/models/entity/backend";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbProductsRepository extends DbTableRepositoryBase<Product_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("products", getDbconn);
	}

	async insert(
		name: string,
		slug: string,
		unitOfSale: string,
		price: number,
		imageUrl: string
	): Promise<number> {
		return await this._insert(
			"name,slug,unit_of_sale,price,image_url",
			"?,?,?,?,?",
			[name, slug, unitOfSale, price, imageUrl]
		);
	}
}

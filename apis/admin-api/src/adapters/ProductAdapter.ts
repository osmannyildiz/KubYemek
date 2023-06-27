import { Product_Private } from "@core/common/models/entity/backend";
import { Product } from "@core/common/models/entity/frontend";

export class ProductAdapter {
	static privateToPublic(privProduct: Product_Private): Product {
		return {
			id: privProduct.id,
			name: privProduct.name,
			slug: privProduct.slug,
			unitOfSale: privProduct.unit_of_sale,
			price: privProduct.price,
			unitsInStock: privProduct.units_in_stock,
			imageUrl: privProduct.image_url,
		};
	}
}

"use client";

import EntityDeleteModal from "@/components/form/EntityDeleteModal";
import EntityFormOffcanvas from "@/components/form/EntityFormOffcanvas";
import FormFieldRequiredIndicator from "@/components/form/FormFieldRequiredIndicator";
import AppPage from "@/components/layout/AppPage";
import { getProducts } from "@/query/fetchers/products";
import {
	addProduct,
	deleteProduct,
	updateProduct,
} from "@/query/mutations/products";
import { Product } from "@core/common/models/entity/frontend";
import { ErrorType } from "@core/common/models/errors";
import { apiRespBodyIsNotOk, getErrMsg } from "@core/frontends/utils";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function ProductsPage() {
	const queryClient = useQueryClient();
	const productsQuery = useQuery("products", getProducts);
	const addProductMutation = useMutation("addProduct", addProduct);
	const updateProductMutation = useMutation("updateProduct", updateProduct);
	const deleteProductMutation = useMutation("deleteProduct", deleteProduct);

	const [showProductAddForm, setShowProductAddForm] = useState(false);
	const [productToEdit, setProductToEdit] = useState<Product | undefined>();
	const [productToDelete, setProductToDelete] = useState<Product | undefined>();
	const [productAddFormError, setProductAddFormError] = useState<
		string | undefined
	>();
	const [productEditFormError, setProductEditFormError] = useState<
		string | undefined
	>();
	const [productDeleteModalError, setProductDeleteModalError] = useState<
		string | undefined
	>();

	const handleProductAddFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get("name");
		const unitOfSale = formData.get("unitOfSale");
		const price = formData.get("price");
		const imageUrl = formData.get("imageUrl");

		if (!name || !unitOfSale || !price) {
			setProductAddFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		try {
			const respData = await addProductMutation.mutateAsync({
				body: {
					name: name.toString(),
					unitOfSale: unitOfSale.toString(),
					price: +price.toString(),
					imageUrl: imageUrl?.toString(),
				},
			});

			if (apiRespBodyIsNotOk(respData)) {
				setProductAddFormError(respData.message);
				return;
			}

			queryClient.invalidateQueries("products");
			closeProductAddForm();
		} catch (error: any) {
			console.error(error);
			setProductAddFormError(error?.message || getErrMsg(ErrorType.default));
		}
	};

	const handleProductEditFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!productToEdit) return;

		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get("name");
		const slug = formData.get("slug");
		const unitOfSale = formData.get("unitOfSale");
		const price = formData.get("price");
		const imageUrl = formData.get("imageUrl");

		try {
			const respData = await updateProductMutation.mutateAsync({
				id: +productToEdit.id,
				body: {
					name: name?.toString(),
					slug: slug?.toString(),
					unitOfSale: unitOfSale?.toString(),
					price: price ? +price.toString() : undefined,
					imageUrl: imageUrl?.toString(),
				},
			});

			if (apiRespBodyIsNotOk(respData)) {
				setProductEditFormError(respData.message);
				return;
			}

			queryClient.invalidateQueries("products");
			closeProductEditForm();
		} catch (error: any) {
			console.error(error);
			setProductEditFormError(error?.message || getErrMsg(ErrorType.default));
		}
	};

	const handleProductDeleteModalConfirm = async () => {
		if (!productToDelete) return;

		try {
			const respData = await deleteProductMutation.mutateAsync({
				id: +productToDelete.id,
			});

			if (apiRespBodyIsNotOk(respData)) {
				setProductDeleteModalError(respData.message);
				return;
			}

			queryClient.invalidateQueries("products");
			closeProductDeleteModal();
		} catch (error: any) {
			console.error(error);
			setProductDeleteModalError(
				error?.message || getErrMsg(ErrorType.default)
			);
		}
	};

	const closeProductAddForm = () => {
		setShowProductAddForm(false);
		setProductAddFormError(undefined);
	};

	const closeProductEditForm = () => {
		setProductToEdit(undefined);
		setProductEditFormError(undefined);
	};

	const closeProductDeleteModal = () => {
		setProductToDelete(undefined);
		setProductDeleteModalError(undefined);
	};

	return (
		<AppPage
			title="Ürünler"
			titleBar={
				<Button variant="primary" onClick={() => setShowProductAddForm(true)}>
					Ürün Ekle
				</Button>
			}
		>
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope="col">Ürün Adı</th>
						<th scope="col">Takma Ad</th>
						<th scope="col">Satış Birimi</th>
						<th scope="col">Fiyat</th>
						<th scope="col">Stok Sayısı</th>
						<th scope="col" style={{ width: "200px" }}>
							İşlemler
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{productsQuery.isSuccess &&
					!apiRespBodyIsNotOk(productsQuery.data) &&
					productsQuery.data.data
						? productsQuery.data.data.map((product: any) => (
								<tr key={product.id}>
									<td>{product.name}</td>
									<td>{product.slug}</td>
									<td>{product.unitOfSale}</td>
									<td>{product.price}</td>
									<td>{product.unitsInStock}</td>
									<td>
										<Stack direction="horizontal" gap={2}>
											<Button
												variant="primary"
												size="sm"
												onClick={() => setProductToEdit(product)}
											>
												Düzenle
											</Button>
											<Button
												variant="danger"
												size="sm"
												onClick={() => setProductToDelete(product)}
											>
												Sil
											</Button>
										</Stack>
									</td>
								</tr>
						  ))
						: undefined}
				</tbody>
			</table>

			<EntityFormOffcanvas
				show={showProductAddForm}
				title="Ürün Ekle"
				onSubmit={handleProductAddFormSubmit}
				onCancel={closeProductAddForm}
			>
				<Form.Group controlId="name">
					<Form.Label>
						Ürün Adı <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="text" name="name" />
				</Form.Group>

				<Form.Group controlId="unitOfSale">
					<Form.Label>
						Satış Birimi <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="text" name="unitOfSale" />
				</Form.Group>

				<Form.Group controlId="price">
					<Form.Label>
						Fiyat (Kuruş) <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="number" name="price" min={1} />
				</Form.Group>

				{productAddFormError ? (
					<div className="text-danger">{productAddFormError}</div>
				) : undefined}

				<Stack direction="horizontal" gap={2}>
					<Button
						variant="primary"
						type="submit"
						disabled={addProductMutation.isLoading}
					>
						{addProductMutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						Ekle
					</Button>
				</Stack>
			</EntityFormOffcanvas>

			<EntityFormOffcanvas
				show={!!productToEdit}
				title="Ürünü Düzenle"
				onSubmit={handleProductEditFormSubmit}
				onCancel={closeProductEditForm}
			>
				<Form.Group controlId="name">
					<Form.Label>
						Ürün Adı <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control
						type="text"
						name="name"
						defaultValue={productToEdit?.name}
					/>
				</Form.Group>

				<Form.Group controlId="slug">
					<Form.Label>
						Takma Ad <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control
						type="text"
						name="slug"
						defaultValue={productToEdit?.slug}
					/>
				</Form.Group>

				<Form.Group controlId="unitOfSale">
					<Form.Label>
						Satış Birimi <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control
						type="text"
						name="unitOfSale"
						defaultValue={productToEdit?.unitOfSale}
					/>
				</Form.Group>

				<Form.Group controlId="price">
					<Form.Label>
						Fiyat (Kuruş) <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control
						type="number"
						name="price"
						min={1}
						defaultValue={productToEdit?.price}
					/>
				</Form.Group>

				{productEditFormError ? (
					<div className="text-danger">{productEditFormError}</div>
				) : undefined}

				<Stack direction="horizontal" gap={2}>
					<Button
						variant="primary"
						type="submit"
						disabled={updateProductMutation.isLoading}
					>
						{updateProductMutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						Kaydet
					</Button>
				</Stack>
			</EntityFormOffcanvas>

			<EntityDeleteModal
				show={!!productToDelete}
				title="Ürünü Sil"
				error={productDeleteModalError}
				mutation={deleteProductMutation}
				onConfirm={handleProductDeleteModalConfirm}
				onCancel={closeProductDeleteModal}
			>
				<em>{productToDelete?.name}</em> adlı ürünü silmek istediğinize emin
				misiniz?
			</EntityDeleteModal>
		</AppPage>
	);
}

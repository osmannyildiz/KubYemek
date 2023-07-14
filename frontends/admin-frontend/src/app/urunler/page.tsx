"use client";

import EntityFormModal from "@/components/form/EntityFormModal";
import EntityFormOffcanvas from "@/components/form/EntityFormOffcanvas";
import FormFieldRequiredIndicator from "@/components/form/FormFieldRequiredIndicator";
import ImagePicker from "@/components/form/ImagePicker";
import AppPage from "@/components/layout/AppPage";
import { useAuthContext } from "@/contexts/AuthContext";
import { getProducts } from "@/query/fetchers/products";
import {
	addProduct,
	deleteProduct,
	produceProduct,
	updateProduct,
} from "@/query/mutations/products";
import { Product } from "@core/common/models/entity/frontend";
import { ErrorType } from "@core/common/models/errors";
import { AdminApiClient } from "@core/frontends/apiClients";
import { formatPriceForDisplay, getErrMsg } from "@core/frontends/utils";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function ProductsPage() {
	const { token } = useAuthContext();
	const adminApiClient = new AdminApiClient(token);
	const queryClient = useQueryClient();
	const productsQuery = useQuery("products", () => getProducts(adminApiClient));
	const addProductMutation = useMutation("addProduct", addProduct);
	const updateProductMutation = useMutation("updateProduct", updateProduct);
	const deleteProductMutation = useMutation("deleteProduct", deleteProduct);
	const produceProductMutation = useMutation("produceProduct", produceProduct);

	const [showProductAddForm, setShowProductAddForm] = useState(false);
	const [productToEdit, setProductToEdit] = useState<Product>();
	const [productToDelete, setProductToDelete] = useState<Product>();
	const [productToProduce, setProductToProduce] = useState<Product>();

	const [productAddFormError, setProductAddFormError] = useState<string>();
	const [productEditFormError, setProductEditFormError] = useState<string>();
	const [productDeleteModalError, setProductDeleteModalError] =
		useState<string>();
	const [productProduceModalError, setProductProduceModalError] =
		useState<string>();

	const handleProductAddFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get("name")?.toString();
		const unitOfSale = formData.get("unitOfSale")?.toString();
		const price = formData.get("price")?.toString();
		const image = formData.get("image");

		if (
			!name ||
			!unitOfSale ||
			!price ||
			!image ||
			(image as File).size === 0
		) {
			setProductAddFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		try {
			await addProductMutation.mutateAsync({
				adminApiClient,
				data: formData,
			});
		} catch (error: any) {
			console.error(error);
			setProductAddFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("products");
		closeProductAddForm();
	};

	const handleProductEditFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!productToEdit) return;

		const formData = new FormData(event.target as HTMLFormElement);

		try {
			await updateProductMutation.mutateAsync({
				adminApiClient,
				id: +productToEdit.id,
				data: formData,
			});
		} catch (error: any) {
			console.error(error);
			setProductEditFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("products");
		closeProductEditForm();
	};

	const handleProductDeleteModalConfirm = async () => {
		if (!productToDelete) return;

		try {
			await deleteProductMutation.mutateAsync({
				adminApiClient,
				id: +productToDelete.id,
			});
		} catch (error: any) {
			console.error(error);
			setProductDeleteModalError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("products");
		closeProductDeleteModal();
	};

	const handleProductProduceModalConfirm = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!productToProduce) return;

		const formData = new FormData(event.target as HTMLFormElement);
		const unitsCount = formData.get("unitsCount")?.toString();

		if (!unitsCount) {
			setProductProduceModalError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		if (+unitsCount.toString() < 1) {
			setProductProduceModalError(getErrMsg(ErrorType.fieldMustBeOneOrBigger));
			return;
		}

		try {
			await produceProductMutation.mutateAsync({
				adminApiClient,
				id: +productToProduce.id,
				data: {
					unitsCount: +unitsCount,
				},
			});
		} catch (error: any) {
			console.error(error);
			setProductProduceModalError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("products");
		closeProductProduceModal();
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

	const closeProductProduceModal = () => {
		setProductToProduce(undefined);
		setProductProduceModalError(undefined);
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
						<th scope="col">Ürün Resmi</th>
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
					{productsQuery.isSuccess && productsQuery.data
						? productsQuery.data.map((product) => (
								<tr key={product.id}>
									<td
										style={{
											width: "200px",
											height: "150px",
										}}
									>
										<img
											src={product.imageUrl}
											alt="Ürün resmi"
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</td>
									<td>{product.name}</td>
									<td>{product.slug}</td>
									<td>{product.unitOfSale}</td>
									<td>{formatPriceForDisplay(product.price)}</td>
									<td>{product.unitsInStock}</td>
									<td>
										<Stack direction="horizontal" gap={2}>
											<Button
												variant="success"
												size="sm"
												onClick={() => setProductToProduce(product)}
											>
												Üret
											</Button>
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
				error={productAddFormError}
				mutation={addProductMutation}
				confirmButtonVariant="primary"
				confirmButtonText="Ekle"
				onSubmit={handleProductAddFormSubmit}
				onCancel={closeProductAddForm}
			>
				<Form.Group controlId="name">
					<Form.Label>
						Ürün Adı <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="text" name="name" required />
				</Form.Group>

				<Form.Group controlId="unitOfSale">
					<Form.Label>
						Satış Birimi <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="text" name="unitOfSale" required />
				</Form.Group>

				<Form.Group controlId="price">
					<Form.Label>
						Fiyat (Kuruş) <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="number" name="price" required min={1} />
				</Form.Group>

				<Form.Group controlId="image">
					<Form.Label>
						Ürün Resmi <FormFieldRequiredIndicator />
					</Form.Label>
					<ImagePicker name="image" />
				</Form.Group>
			</EntityFormOffcanvas>

			<EntityFormOffcanvas
				show={!!productToEdit}
				title="Ürünü Düzenle"
				error={productEditFormError}
				mutation={updateProductMutation}
				confirmButtonVariant="primary"
				confirmButtonText="Kaydet"
				onSubmit={handleProductEditFormSubmit}
				onCancel={closeProductEditForm}
			>
				<Form.Group controlId="name">
					<Form.Label>Ürün Adı</Form.Label>
					<Form.Control
						type="text"
						name="name"
						defaultValue={productToEdit?.name}
						required
					/>
				</Form.Group>

				<Form.Group controlId="slug">
					<Form.Label>Takma Ad</Form.Label>
					<Form.Control
						type="text"
						name="slug"
						defaultValue={productToEdit?.slug}
						required
					/>
				</Form.Group>

				<Form.Group controlId="unitOfSale">
					<Form.Label>Satış Birimi</Form.Label>
					<Form.Control
						type="text"
						name="unitOfSale"
						defaultValue={productToEdit?.unitOfSale}
						required
					/>
				</Form.Group>

				<Form.Group controlId="price">
					<Form.Label>Fiyat (Kuruş)</Form.Label>
					<Form.Control
						type="number"
						name="price"
						defaultValue={productToEdit?.price}
						required
						min={1}
					/>
				</Form.Group>

				<Form.Group controlId="image">
					<Form.Label>Ürün Resmi</Form.Label>
					<ImagePicker name="image" defaultImageUrl={productToEdit?.imageUrl} />
				</Form.Group>
			</EntityFormOffcanvas>

			<EntityFormModal
				show={!!productToDelete}
				title="Ürünü Sil"
				error={productDeleteModalError}
				mutation={deleteProductMutation}
				confirmButtonVariant="danger"
				confirmButtonText="Sil"
				onSubmit={handleProductDeleteModalConfirm}
				onCancel={closeProductDeleteModal}
			>
				<p>
					<em>{productToDelete?.name}</em> adlı ürünü silmek istediğinize emin
					misiniz?
				</p>
			</EntityFormModal>

			<EntityFormModal
				show={!!productToProduce}
				title="Ürünü Üret"
				error={productProduceModalError}
				mutation={produceProductMutation}
				confirmButtonVariant="success"
				confirmButtonText="Üret"
				onSubmit={handleProductProduceModalConfirm}
				onCancel={closeProductProduceModal}
			>
				<p>
					<em>{productToProduce?.name}</em> adlı üründen kaç birim üretmek
					istersiniz?
				</p>

				<Form.Group controlId="unitsCount">
					<Form.Control
						type="number"
						name="unitsCount"
						defaultValue={1}
						required
						min={1}
					/>
					<Form.Label>
						<em>{productToProduce?.unitOfSale}</em>
					</Form.Label>
				</Form.Group>
			</EntityFormModal>
		</AppPage>
	);
}

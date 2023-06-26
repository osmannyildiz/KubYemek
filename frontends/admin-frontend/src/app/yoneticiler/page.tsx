"use client";

import EntityDeleteModal from "@/components/form/EntityDeleteModal";
import EntityFormOffcanvas from "@/components/form/EntityFormOffcanvas";
import AppPage from "@/components/layout/AppPage";
import { getAdmins } from "@/query/fetchers/admins";
import { addAdmin, updateAdmin } from "@/query/mutations/admins";
import { Admin } from "@core/common/models/entity/frontend";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function AdminsPage() {
	const queryClient = useQueryClient();
	const adminsQuery = useQuery("admins", getAdmins);
	const addAdminMutation = useMutation("addAdmin", addAdmin);
	const updateAdminMutation = useMutation("updateAdmin", updateAdmin);

	const [showAdminAddForm, setShowAdminAddForm] = useState(false);
	const [adminToEdit, setAdminToEdit] = useState<Admin | undefined>();
	const [adminToDelete, setAdminToDelete] = useState<Admin | undefined>();
	const [adminAddFormError, setAdminAddFormError] = useState<
		string | undefined
	>();
	const [adminEditFormError, setAdminEditFormError] = useState<
		string | undefined
	>();

	const handleAdminAddFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("email");
		const password = formData.get("password");
		const passwordRepeat = formData.get("passwordRepeat");

		if (!email || !password || !passwordRepeat) {
			setAdminAddFormError("Lütfen tüm zorunlu alanları doldurun.");
			return;
		}

		if (password.length < 6) {
			setAdminAddFormError("Şifre en az 6 karakter uzunluğunda olmalıdır.");
			return;
		}

		if (password !== passwordRepeat) {
			setAdminAddFormError("Girilen şifreler uyuşmuyor.");
			return;
		}

		try {
			const respData = await addAdminMutation.mutateAsync({
				body: {
					email: email as string,
					password: password as string,
				},
			});

			if (apiRespBodyIsNotOk(respData)) {
				setAdminAddFormError(respData.message);
				return;
			}

			queryClient.invalidateQueries("admins");
			closeAdminAddForm();
		} catch (error: any) {
			setAdminAddFormError(error?.message || "Beklenmedik bir hata oluştu.");
		}
	};

	const handleAdminEditFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("email");
		const password = formData.get("password");
		const passwordRepeat = formData.get("passwordRepeat");

		if (password && password.length < 6) {
			setAdminEditFormError("Şifre en az 6 karakter uzunluğunda olmalıdır.");
			return;
		}

		if (password && password !== passwordRepeat) {
			setAdminEditFormError("Girilen şifreler uyuşmuyor.");
			return;
		}

		try {
			const respData = await updateAdminMutation.mutateAsync({
				id: +adminToEdit!.id,
				body: {
					email: email as string,
					password: password as string,
				},
			});

			if (apiRespBodyIsNotOk(respData)) {
				setAdminEditFormError(respData.message);
				return;
			}

			queryClient.invalidateQueries("admins");
			closeAdminEditForm();
		} catch (error: any) {
			setAdminEditFormError(error?.message || "Beklenmedik bir hata oluştu.");
		}
	};

	const handleAdminDeleteModalConfirm = () => {
		setAdminToDelete(undefined);
	};

	const closeAdminAddForm = () => {
		setShowAdminAddForm(false);
		setAdminAddFormError(undefined);
	};

	const closeAdminEditForm = () => {
		setAdminToEdit(undefined);
		setAdminEditFormError(undefined);
	};

	const closeAdminDeleteModal = () => {
		setAdminToDelete(undefined);
	};

	return (
		<AppPage
			title="Yöneticiler"
			titleBar={
				<Button variant="primary" onClick={() => setShowAdminAddForm(true)}>
					Yönetici Ekle
				</Button>
			}
		>
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						{/* <th scope="col">#</th> */}
						<th scope="col">E-posta</th>
						<th scope="col">Şifre</th>
						<th scope="col" style={{ width: "200px" }}>
							İşlemler
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{adminsQuery.isSuccess &&
						!apiRespBodyIsNotOk(adminsQuery.data) &&
						adminsQuery.data.data &&
						adminsQuery.data.data.map((admin: any) => (
							<tr key={admin.id}>
								{/* <th scope="row">{admin.id}</th> */}
								<td>{admin.email}</td>
								<td>********</td>
								<td>
									<Stack direction="horizontal" gap={2}>
										<Button
											variant="primary"
											size="sm"
											onClick={() => setAdminToEdit(admin)}
										>
											Düzenle
										</Button>
										<Button
											variant="danger"
											size="sm"
											onClick={() => setAdminToDelete(admin)}
										>
											Sil
										</Button>
									</Stack>
								</td>
							</tr>
						))}
				</tbody>
			</table>

			<EntityFormOffcanvas
				show={showAdminAddForm}
				title="Yönetici Ekle"
				onSubmit={handleAdminAddFormSubmit}
				onCancel={closeAdminAddForm}
			>
				<Form.Group controlId="email">
					<Form.Label>E-posta adresi</Form.Label>
					<Form.Control type="email" name="email" />
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Şifre</Form.Label>
					<Form.Control type="password" name="password" />
				</Form.Group>

				<Form.Group controlId="passwordRepeat">
					<Form.Label>Şifre (tekrar)</Form.Label>
					<Form.Control type="password" name="passwordRepeat" />
				</Form.Group>

				<div className="text-danger">{adminAddFormError}</div>

				<Stack direction="horizontal" gap={2}>
					<Button
						variant="primary"
						type="submit"
						disabled={addAdminMutation.isLoading}
					>
						{addAdminMutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						Ekle
					</Button>
				</Stack>
			</EntityFormOffcanvas>

			<EntityFormOffcanvas
				show={!!adminToEdit}
				title="Yöneticiyi Düzenle"
				onSubmit={handleAdminEditFormSubmit}
				onCancel={closeAdminEditForm}
			>
				<Form.Group controlId="email">
					<Form.Label>E-posta adresi</Form.Label>
					<Form.Control
						type="email"
						name="email"
						defaultValue={adminToEdit?.email}
					/>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Şifre</Form.Label>
					<Form.Control type="password" name="password" />
				</Form.Group>

				<Form.Group controlId="passwordRepeat">
					<Form.Label>Şifre (tekrar)</Form.Label>
					<Form.Control type="password" name="passwordRepeat" />
				</Form.Group>

				<div className="text-danger">{adminEditFormError}</div>

				<Stack direction="horizontal" gap={2}>
					<Button
						variant="primary"
						type="submit"
						disabled={updateAdminMutation.isLoading}
					>
						{updateAdminMutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						Kaydet
					</Button>
				</Stack>
			</EntityFormOffcanvas>

			<EntityDeleteModal
				show={!!adminToDelete}
				title="Yöneticiyi Sil"
				onConfirm={handleAdminDeleteModalConfirm}
				onCancel={closeAdminDeleteModal}
			>
				<em>{adminToDelete?.email}</em> e-posta adresine sahip olan yöneticiyi
				silmek istediğinize emin misiniz?
			</EntityDeleteModal>
		</AppPage>
	);
}

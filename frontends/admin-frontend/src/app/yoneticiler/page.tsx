"use client";

import EntityFormModal from "@/components/form/EntityFormModal";
import EntityFormOffcanvas from "@/components/form/EntityFormOffcanvas";
import FormFieldRequiredIndicator from "@/components/form/FormFieldRequiredIndicator";
import AppPage from "@/components/layout/AppPage";
import { useAuthContext } from "@/contexts/AuthContext";
import { getAdmins } from "@/query/fetchers/admins";
import { deleteAdmin, updateAdmin } from "@/query/mutations/admins";
import { registerAdmin } from "@/query/mutations/auth";
import { Admin } from "@core/common/models/entity/frontend";
import { ErrorType } from "@core/common/models/errors";
import { AdminApiClient, AuthApiClient } from "@core/frontends/apiClients";
import { getErrMsg } from "@core/frontends/utils";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function AdminsPage() {
	const { token } = useAuthContext();
	const authApiClient = new AuthApiClient(token);
	const adminApiClient = new AdminApiClient(token);
	const queryClient = useQueryClient();
	const adminsQuery = useQuery("admins", () => getAdmins(adminApiClient));
	const registerAdminMutation = useMutation("registerAdmin", registerAdmin);
	const updateAdminMutation = useMutation("updateAdmin", updateAdmin);
	const deleteAdminMutation = useMutation("deleteAdmin", deleteAdmin);

	const [showAdminAddForm, setShowAdminAddForm] = useState(false);
	const [adminToEdit, setAdminToEdit] = useState<Admin>();
	const [adminToDelete, setAdminToDelete] = useState<Admin>();

	const [adminAddFormError, setAdminAddFormError] = useState<string>();
	const [adminEditFormError, setAdminEditFormError] = useState<string>();
	const [adminDeleteModalError, setAdminDeleteModalError] = useState<string>();

	const handleAdminAddFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const username = formData.get("username")?.toString();
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();
		const passwordRepeat = formData.get("passwordRepeat")?.toString();

		if (!username || !email || !password || !passwordRepeat) {
			setAdminAddFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		if (password.length < 6) {
			setAdminAddFormError(
				getErrMsg(ErrorType.passwordShouldSatisfyMinimumLength)
			);
			return;
		}

		if (password !== passwordRepeat) {
			setAdminAddFormError(getErrMsg(ErrorType.passwordsDoNotMatch));
			return;
		}

		try {
			await registerAdminMutation.mutateAsync({
				authApiClient,
				data: {
					username,
					email,
					password,
				},
			});
		} catch (error: any) {
			console.error(error);
			setAdminAddFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("admins");
		closeAdminAddForm();
	};

	const handleAdminEditFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!adminToEdit) return;

		const formData = new FormData(event.target as HTMLFormElement);
		const username = formData.get("username")?.toString();
		const email = formData.get("email")?.toString();

		try {
			await updateAdminMutation.mutateAsync({
				adminApiClient,
				id: +adminToEdit.id,
				data: {
					username,
					email,
				},
			});
		} catch (error: any) {
			console.error(error);
			setAdminEditFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("admins");
		closeAdminEditForm();
	};

	const handleAdminDeleteModalConfirm = async () => {
		if (!adminToDelete) return;

		try {
			await deleteAdminMutation.mutateAsync({
				adminApiClient,
				id: +adminToDelete.id,
			});
		} catch (error: any) {
			console.error(error);
			setAdminDeleteModalError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("admins");
		closeAdminDeleteModal();
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
		setAdminDeleteModalError(undefined);
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
						<th scope="col">Kullanıcı Adı</th>
						<th scope="col">E-posta</th>
						<th scope="col">Şifre</th>
						<th scope="col" style={{ width: "200px" }}>
							İşlemler
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{adminsQuery.isSuccess && adminsQuery.data
						? adminsQuery.data.map((admin) => (
								<tr key={admin.id}>
									<td>{admin.username}</td>
									<td>{admin.email}</td>
									<td>******</td>
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
						  ))
						: undefined}
				</tbody>
			</table>

			<EntityFormOffcanvas
				show={showAdminAddForm}
				title="Yönetici Ekle"
				error={adminAddFormError}
				mutation={registerAdminMutation}
				confirmButtonVariant="primary"
				confirmButtonText="Ekle"
				onSubmit={handleAdminAddFormSubmit}
				onCancel={closeAdminAddForm}
			>
				<Form.Group controlId="username">
					<Form.Label>
						Kullanıcı adı <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="text" name="username" required />
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>
						E-posta adresi <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control type="email" name="email" required />
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>
						Şifre <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control
						type="password"
						name="password"
						required
						minLength={6}
					/>
				</Form.Group>

				<Form.Group controlId="passwordRepeat">
					<Form.Label>
						Şifre (tekrar) <FormFieldRequiredIndicator />
					</Form.Label>
					<Form.Control
						type="password"
						name="passwordRepeat"
						required
						minLength={6}
					/>
				</Form.Group>
			</EntityFormOffcanvas>

			<EntityFormOffcanvas
				show={!!adminToEdit}
				title="Yöneticiyi Düzenle"
				error={adminEditFormError}
				mutation={updateAdminMutation}
				confirmButtonVariant="primary"
				confirmButtonText="Kaydet"
				onSubmit={handleAdminEditFormSubmit}
				onCancel={closeAdminEditForm}
			>
				<Form.Group controlId="username">
					<Form.Label>Kullanıcı adı</Form.Label>
					<Form.Control
						type="text"
						name="username"
						defaultValue={adminToEdit?.username}
						required
					/>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>E-posta adresi</Form.Label>
					<Form.Control
						type="email"
						name="email"
						defaultValue={adminToEdit?.email}
						required
					/>
				</Form.Group>
			</EntityFormOffcanvas>

			<EntityFormModal
				show={!!adminToDelete}
				title="Yöneticiyi Sil"
				error={adminDeleteModalError}
				mutation={deleteAdminMutation}
				confirmButtonVariant="danger"
				confirmButtonText="Sil"
				onSubmit={handleAdminDeleteModalConfirm}
				onCancel={closeAdminDeleteModal}
			>
				<p>
					<em>{adminToDelete?.username}</em> kullanıcı adına sahip olan
					yöneticiyi silmek istediğinize emin misiniz?
				</p>
			</EntityFormModal>
		</AppPage>
	);
}

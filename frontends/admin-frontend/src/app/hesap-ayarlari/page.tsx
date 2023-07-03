"use client";

import FormFieldRequiredIndicator from "@/components/form/FormFieldRequiredIndicator";
import AppPage from "@/components/layout/AppPage";
import { useAuthContext } from "@/contexts/AuthContext";
import { changePassword } from "@/query/mutations/auth";
import { ErrorType } from "@core/common/models/errors";
import { AuthApiClient } from "@core/frontends/apiClients";
import { getErrMsg } from "@core/frontends/utils";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation } from "react-query";

export default function AccountSettingsPage() {
	const { token } = useAuthContext();
	const authApiClient = new AuthApiClient(token);
	const changePasswordMutation = useMutation("changePassword", changePassword);

	const [changePasswordFormError, setChangePasswordFormError] =
		useState<string>();

	const handleChangePasswordFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const currentPassword = formData.get("currentPassword");
		const newPassword = formData.get("newPassword");
		const newPasswordRepeat = formData.get("newPasswordRepeat");

		if (!currentPassword || !newPassword || !newPasswordRepeat) {
			setChangePasswordFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		if (newPassword.length < 6) {
			setChangePasswordFormError(
				getErrMsg(ErrorType.passwordShouldSatisfyMinimumLength)
			);
			return;
		}

		if (newPassword !== newPasswordRepeat) {
			setChangePasswordFormError(getErrMsg(ErrorType.passwordsDoNotMatch));
			return;
		}

		try {
			await changePasswordMutation.mutateAsync({
				authApiClient,
				data: {
					currentPassword: currentPassword.toString(),
					newPassword: newPassword.toString(),
				},
			});
		} catch (error: any) {
			console.error(error);
			setChangePasswordFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		// TODO Use anything other than the browser's alert ;)
		alert("Şifreniz başarıyla güncellendi.");
		form.reset();
	};

	return (
		<AppPage title="Hesap Ayarları">
			<hr />
			<section>
				<h2 className="display-6 mb-4">Şifre Değiştir</h2>
				<Form
					onSubmit={(event) => {
						event.preventDefault();
						handleChangePasswordFormSubmit(event);
					}}
				>
					<Stack gap={3}>
						<Form.Group controlId="currentPassword">
							<Form.Label>
								Mevcut şifre <FormFieldRequiredIndicator />
							</Form.Label>
							<Form.Control
								type="password"
								name="currentPassword"
								required
								minLength={6}
							/>
						</Form.Group>

						<Form.Group controlId="newPassword">
							<Form.Label>
								Yeni şifre <FormFieldRequiredIndicator />
							</Form.Label>
							<Form.Control
								type="password"
								name="newPassword"
								required
								minLength={6}
							/>
						</Form.Group>

						<Form.Group controlId="newPasswordRepeat">
							<Form.Label>
								Yeni şifre (tekrar) <FormFieldRequiredIndicator />
							</Form.Label>
							<Form.Control
								type="password"
								name="newPasswordRepeat"
								required
								minLength={6}
							/>
						</Form.Group>

						{changePasswordFormError ? (
							<div className="text-danger">{changePasswordFormError}</div>
						) : undefined}

						<Stack direction="horizontal" gap={2}>
							<Button
								type="submit"
								variant="primary"
								disabled={changePasswordMutation.isLoading}
							>
								{changePasswordMutation.isLoading ? (
									<Icon path={mdiLoading} size={0.8} spin className="me-2" />
								) : undefined}
								Kaydet
							</Button>
						</Stack>
					</Stack>
				</Form>
			</section>
		</AppPage>
	);
}

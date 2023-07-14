"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { loginAdmin } from "@/query/mutations/auth";
import { ErrorType } from "@core/common/models/errors";
import { AuthApiClient } from "@core/frontends/apiClients";
import { getErrMsg } from "@core/frontends/utils";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { useMutation } from "react-query";

export default function LoginPage() {
	const { token, login } = useAuthContext();
	const authApiClient = new AuthApiClient(token);
	const loginAdminMutation = useMutation("loginAdmin", loginAdmin);

	const [loginFormError, setLoginFormError] = useState<string>();

	const handleLoginFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !password) {
			setLoginFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		let token;
		try {
			token = await loginAdminMutation.mutateAsync({
				authApiClient,
				data: {
					email,
					password,
				},
			});
		} catch (error: any) {
			console.error(error);
			setLoginFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		login(token);
	};

	return (
		<Card className="mx-auto mt-5" style={{ width: "36rem", maxWidth: "100%" }}>
			<Card.Header>Yönetici Girişi</Card.Header>
			<Form
				onSubmit={(event) => {
					event.preventDefault();
					handleLoginFormSubmit(event);
				}}
			>
				<Card.Body>
					<Stack gap={3}>
						<Form.Group controlId="email">
							<Form.Label>E-posta adresi</Form.Label>
							<Form.Control type="email" name="email" required />
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Şifre</Form.Label>
							<Form.Control type="password" name="password" required />
						</Form.Group>
					</Stack>
				</Card.Body>
				<Card.Footer>
					<Stack direction="horizontal" gap={2}>
						<div className="text-danger me-auto">{loginFormError}</div>

						<Button
							type="submit"
							variant="primary"
							disabled={loginAdminMutation.isLoading}
						>
							{loginAdminMutation.isLoading ? (
								<Icon path={mdiLoading} size={0.8} spin className="me-2" />
							) : undefined}
							Giriş Yap
						</Button>
					</Stack>
				</Card.Footer>
			</Form>
		</Card>
	);
}

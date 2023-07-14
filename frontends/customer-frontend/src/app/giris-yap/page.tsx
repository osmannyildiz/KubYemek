"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { login as apiLogin } from "@/query/mutations/auth";
import { ErrorType } from "@core/common/models/errors";
import { AuthApiClient } from "@core/frontends/apiClients";
import { getErrMsg } from "@core/frontends/utils";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation } from "react-query";

export default function LoginPage() {
	const { token, login } = useAuthContext();
	const authApiClient = new AuthApiClient(token);
	const loginMutation = useMutation("login", apiLogin);

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
			token = await loginMutation.mutateAsync({
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
		<>
			<h1 className="display-4 mb-3">Giriş Yap</h1>
			<Form
				onSubmit={(event) => {
					event.preventDefault();
					handleLoginFormSubmit(event);
				}}
			>
				<Stack gap={3}>
					<Form.Group controlId="email">
						<Form.Control
							type="email"
							name="email"
							placeholder="E-posta adresi"
							required
						/>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Control
							type="password"
							name="password"
							placeholder="Şifre"
							required
						/>
					</Form.Group>

					{loginFormError ? (
						<div className="text-danger me-auto">{loginFormError}</div>
					) : undefined}

					<Button
						type="submit"
						variant="primary"
						disabled={loginMutation.isLoading}
					>
						{loginMutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						Giriş Yap
					</Button>
				</Stack>
			</Form>

			<hr />

			<h2 className="display-5">Hesabınız yok mu?</h2>
			<Button variant="primary" as={Link} href="/kayit-ol" className="d-block">
				Kayıt Ol
			</Button>
		</>
	);
}

"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { login as apiLogin, register } from "@/query/mutations/auth";
import { ErrorType } from "@core/common/models/errors";
import { AuthApiClient } from "@core/frontends/apiClients";
import { getErrMsg } from "@core/frontends/utils";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation } from "react-query";

export default function RegisterPage() {
	const { token, login } = useAuthContext();
	const authApiClient = new AuthApiClient(token);
	const registerMutation = useMutation("register", register);
	const loginMutation = useMutation("login", apiLogin);

	const [registerFormError, setRegisterFormError] = useState<string>();

	const handleRegisterFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();
		const passwordRepeat = formData.get("passwordRepeat")?.toString();
		const name = formData.get("name")?.toString();
		const surname = formData.get("surname")?.toString();
		const deliveryAddress = formData.get("deliveryAddress")?.toString();
		const birthDate = formData.get("birthDate")?.toString();

		if (
			!email ||
			!password ||
			!passwordRepeat ||
			!name ||
			!surname ||
			!deliveryAddress ||
			!birthDate
		) {
			setRegisterFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		if (password.length < 6) {
			setRegisterFormError(
				getErrMsg(ErrorType.passwordShouldSatisfyMinimumLength)
			);
			return;
		}

		if (password !== passwordRepeat) {
			setRegisterFormError(getErrMsg(ErrorType.passwordsDoNotMatch));
			return;
		}

		try {
			await registerMutation.mutateAsync({
				authApiClient,
				data: {
					email,
					password,
					name,
					surname,
					deliveryAddress,
					birthDate,
				},
			});
		} catch (error: any) {
			console.error(error);
			setRegisterFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
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
			setRegisterFormError(
				"Kaydınız başarıyla tamamlandı. Giriş Yap sayfasından giriş yapabilirsiniz."
			);
			return;
		}

		login(token);
	};

	return (
		<>
			<h1 className="display-4 mb-3">Kayıt Ol</h1>
			<Form
				onSubmit={(event) => {
					event.preventDefault();
					handleRegisterFormSubmit(event);
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
							minLength={6}
						/>
					</Form.Group>

					<Form.Group controlId="passwordRepeat">
						<Form.Control
							type="password"
							name="passwordRepeat"
							placeholder="Şifre (tekrar)"
							required
							minLength={6}
						/>
					</Form.Group>

					<Form.Group controlId="name">
						<Form.Control
							type="text"
							name="name"
							placeholder="Adınız"
							required
						/>
					</Form.Group>

					<Form.Group controlId="surname">
						<Form.Control
							type="text"
							name="surname"
							placeholder="Soyadınız"
							required
						/>
					</Form.Group>

					<Form.Group controlId="birthDate">
						<Form.Label>Doğum tarihiniz</Form.Label>
						<Form.Control type="date" name="birthDate" required />
					</Form.Group>

					<Form.Group controlId="deliveryAddress">
						<Form.Label>Teslimat adresi</Form.Label>
						<Form.Control
							as="textarea"
							name="deliveryAddress"
							rows={3}
							required
						/>
					</Form.Group>

					{registerFormError ? (
						<div className="text-danger">{registerFormError}</div>
					) : undefined}

					<Button
						type="submit"
						variant="primary"
						disabled={registerMutation.isLoading}
					>
						{registerMutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						Kayıt Ol
					</Button>
				</Stack>
			</Form>

			<hr />

			<h2 className="display-5">Zaten hesabınız var mı?</h2>
			<Button variant="primary" as={Link} href="/giris-yap" className="d-block">
				Giriş Yap
			</Button>
		</>
	);
}

"use client";

import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Form, Modal } from "react-bootstrap";
import type { ButtonVariant } from "react-bootstrap/esm/types";
import { UseMutationResult } from "react-query";

export default function EntityFormModal({
	children,
	show,
	title,
	error,
	mutation,
	confirmButtonVariant,
	confirmButtonText,
	onSubmit,
	onCancel,
}: {
	children: React.ReactNode;
	show: boolean;
	title: string;
	error: string | undefined;
	mutation: UseMutationResult<any, any, any, any>;
	confirmButtonVariant: ButtonVariant;
	confirmButtonText: string;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
}) {
	return (
		<Modal centered show={show} onHide={onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Form
				autoComplete="off"
				onSubmit={(event) => {
					event.preventDefault();
					onSubmit(event);
				}}
			>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer>
					{error ? (
						<div className="text-danger me-auto">{error}</div>
					) : undefined}
					<Button type="button" variant="secondary" onClick={onCancel}>
						İptal
					</Button>
					<Button
						type="submit"
						variant={confirmButtonVariant}
						disabled={mutation.isLoading}
					>
						{mutation.isLoading ? (
							<Icon path={mdiLoading} size={0.8} spin className="me-2" />
						) : undefined}
						{confirmButtonText}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

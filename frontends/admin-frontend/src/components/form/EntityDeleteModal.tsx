"use client";

import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Modal } from "react-bootstrap";
import { UseMutationResult } from "react-query";

export default function EntityDeleteModal({
	children,
	show,
	title,
	error,
	mutation,
	onConfirm,
	onCancel,
}: {
	children: React.ReactNode;
	show: boolean;
	title: string;
	error: string | undefined;
	mutation: UseMutationResult<any, any, any, any>;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<Modal centered show={show} onHide={onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				{error ? <div className="text-danger me-auto">{error}</div> : undefined}
				<Button variant="secondary" onClick={onCancel}>
					İptal
				</Button>
				<Button
					variant="danger"
					disabled={mutation.isLoading}
					onClick={onConfirm}
				>
					{mutation.isLoading ? (
						<Icon path={mdiLoading} size={0.8} spin className="me-2" />
					) : undefined}
					Sil
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

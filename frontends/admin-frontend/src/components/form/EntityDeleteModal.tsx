"use client";

import { Button, Modal } from "react-bootstrap";

export default function EntityDeleteModal({
	children,
	show,
	title,
	onConfirm,
	onCancel,
}: {
	children: React.ReactNode;
	show: boolean;
	title: string;
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
				<Button variant="secondary" onClick={onCancel}>
					İptal
				</Button>
				<Button variant="danger" onClick={onConfirm}>
					Sil
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

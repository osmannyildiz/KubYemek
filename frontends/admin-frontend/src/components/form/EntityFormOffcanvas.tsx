"use client";

import { Form, Offcanvas, Stack } from "react-bootstrap";

export default function EntityFormOffcanvas({
	children,
	show,
	title,
	onSubmit,
	onCancel,
}: {
	children: React.ReactNode;
	show: boolean;
	title: string;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
}) {
	return (
		<Offcanvas
			placement="end"
			/* backdrop="static" */
			show={show}
			onHide={onCancel}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>{title}</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Form
					autoComplete="off"
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit(event);
					}}
				>
					<Stack gap={3}>{children}</Stack>
				</Form>
			</Offcanvas.Body>
		</Offcanvas>
	);
}

"use client";

import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Form, Offcanvas, Stack } from "react-bootstrap";
import type { ButtonVariant } from "react-bootstrap/esm/types";
import { UseMutationResult } from "react-query";

export default function EntityFormOffcanvas({
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

					{error ? <div className="text-danger mt-3">{error}</div> : undefined}

					<Stack direction="horizontal" gap={2} className="mt-3">
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
					</Stack>
				</Form>
			</Offcanvas.Body>
		</Offcanvas>
	);
}

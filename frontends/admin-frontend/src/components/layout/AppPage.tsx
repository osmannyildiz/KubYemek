"use client";

import { Stack } from "react-bootstrap";

export default function AppPage({
	title,
	titleBar,
	children,
}: {
	title: string;
	titleBar?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<>
			<Stack direction="horizontal" gap={2}>
				<h1 className="display-4 me-auto">{title}</h1>
				{titleBar}
			</Stack>

			{children}
		</>
	);
}

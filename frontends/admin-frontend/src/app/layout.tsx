"use client";

import AppNavbar from "@/components/AppNavbar";
import { Container, SSRProvider } from "react-bootstrap";
import "./globals.scss";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SSRProvider>
			<html lang="tr">
				<head>
					<title>KubYemek Yönetim Paneli</title>
				</head>
				<body>
					<header>
						<AppNavbar />
					</header>
					<main className="pt-4">
						<Container>{children}</Container>
					</main>
					<footer></footer>
				</body>
			</html>
		</SSRProvider>
	);
}

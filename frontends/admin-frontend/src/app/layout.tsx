"use client";

import AppNavbar from "@/components/layout/AppNavbar";
import { Container, SSRProvider } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.scss";

const queryClient = new QueryClient();

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}

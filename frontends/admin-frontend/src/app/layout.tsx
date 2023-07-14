"use client";

import GlobalContextsProvider from "@/components/GlobalContextsProvider";
import RouteGuard from "@/components/RouteGuard";
import AppHeader from "@/components/layout/AppHeader";
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
			<GlobalContextsProvider>
				<SSRProvider>
					<html lang="tr">
						<head>
							<title>KubYemek Yönetim Paneli</title>
						</head>
						<body>
							<AppHeader />
							<main className="pt-4">
								<Container>
									<RouteGuard>{children}</RouteGuard>
								</Container>
							</main>
						</body>
					</html>
				</SSRProvider>
			</GlobalContextsProvider>
		</QueryClientProvider>
	);
}

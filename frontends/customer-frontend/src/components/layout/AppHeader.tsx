import { useAuthContext } from "@/contexts/AuthContext";
import { mdiAccount, mdiAccountBadgeOutline, mdiBell, mdiCart } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function AppHeader() {
	const { isAutoLoginAttempted, isLoggedIn } = useAuthContext();

	return (
		<Navbar bg="white" variant="light">
			<Container>
				<Navbar.Brand>
					<strong>KubYemek</strong>
				</Navbar.Brand>
				{isAutoLoginAttempted ? (
					<Nav className="text-dark">
						<Nav.Link as={Link} href="/sepetim" style={{ color: "inherit" }}>
							<Icon path={mdiCart} size={1} />
						</Nav.Link>
						{isLoggedIn ? (
							<>
								<Nav.Link
									as={Link}
									href="/bildirimlerim"
									style={{ color: "inherit" }}
								>
									<Icon path={mdiBell} size={1} />
								</Nav.Link>
								<Nav.Link
									as={Link}
									href="/hesabim"
									style={{ color: "inherit" }}
								>
									<Icon path={mdiAccount} size={1} />
								</Nav.Link>
							</>
						) : (
							<Nav.Link
								as={Link}
								href="/giris-yap"
								style={{ color: "inherit" }}
							>
								<Icon path={mdiAccountBadgeOutline} size={1} />
							</Nav.Link>
						)}
					</Nav>
				) : undefined}
			</Container>
		</Navbar>
	);
}

import { useAuthContext } from "@/contexts/AuthContext";
import { mdiBell } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function AppHeader() {
	const { isAutoLoginAttempted, isLoggedIn, tokenPayload, logout } =
		useAuthContext();

	return (
		<header>
			<Navbar
				bg={isAutoLoginAttempted ? "primary" : "white"}
				variant={isAutoLoginAttempted ? "dark" : "light"}
				style={{
					transition: "background-color 250ms ease",
				}}
			>
				<Container fluid>
					<Navbar.Brand
						style={{
							transition: "color 250ms ease",
						}}
					>
						<strong>KubYemek</strong> Yönetim Paneli
					</Navbar.Brand>
					{isAutoLoginAttempted ? (
						<Nav>
							{isLoggedIn ? (
								<>
									<Nav.Link as={Link} href="/">
										Ana Sayfa
									</Nav.Link>
									<Nav.Link as={Link} href="/yoneticiler">
										Yöneticiler
									</Nav.Link>
									<Nav.Link as={Link} href="/musteriler">
										Müşteriler
									</Nav.Link>
									<Nav.Link as={Link} href="/urunler">
										Ürünler
									</Nav.Link>
									<Nav.Link as={Link} href="/siparisler">
										Siparişler
									</Nav.Link>
									<Nav.Link
										as={Link}
										href="/bildirimler"
										className="ms-4 me-2"
										style={{
											position: "relative",
										}}
									>
										<Icon
											path={mdiBell}
											size={1}
											style={{
												position: "absolute",
												left: "-8px",
											}}
										/>
									</Nav.Link>
									<NavDropdown
										title={tokenPayload!.adminUsername}
										id="collasible-nav-dropdown"
										align="end"
									>
										<NavDropdown.Item as={Link} href="/hesap-ayarlari">
											Hesap ayarları
										</NavDropdown.Item>
										<NavDropdown.Item onClick={() => logout()}>
											Çıkış yap
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<Nav.Link as={Link} href="/giris-yap">
									Giriş yap
								</Nav.Link>
							)}
						</Nav>
					) : undefined}
				</Container>
			</Navbar>
		</header>
	);
}

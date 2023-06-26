import { mdiBell } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function AppNavbar() {
	return (
		<Navbar bg="primary" variant="dark">
			<Container fluid>
				<Navbar.Brand>
					<strong>KubYemek</strong> Yönetim Paneli
				</Navbar.Brand>
				<Nav>
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
					<Nav.Link as={Link} href="/bildirimler" className="ms-3">
						<Icon path={mdiBell} size={1} />
					</Nav.Link>
					<NavDropdown
						title="(username)"
						id="collasible-nav-dropdown"
						align="end"
					>
						<NavDropdown.Item as={Link} href="/hesap-ayarlari">
							Hesap ayarları
						</NavDropdown.Item>
						<NavDropdown.Item onClick={() => console.log("logout")}>
							Çıkış yap
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Container>
		</Navbar>
	);
}

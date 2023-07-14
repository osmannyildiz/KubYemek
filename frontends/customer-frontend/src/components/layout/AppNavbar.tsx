import { useAuthContext } from "@/contexts/AuthContext";
import { mdiFood, mdiMoped, mdiShimmer } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

const items = [
	{
		icon: mdiShimmer,
		iconSize: 1.4,
		iconOffsetY: "2px",
		label: "Senin İçin",
		href: "/",
	},
	{
		icon: mdiFood,
		iconSize: 1.3,
		iconOffsetY: "0px",
		label: "Ürünler",
		href: "/urunler",
	},
	{
		icon: mdiMoped,
		iconSize: 1.7,
		iconOffsetY: "8px",
		label: "Siparişlerim",
		href: "/siparislerim",
	},
];

export default function AppNavbar() {
	const { isLoggedIn } = useAuthContext();

	// if (!isLoggedIn) {
	// 	return <></>;
	// }

	return (
		<div className="fixed-bottom d-flex justify-content-center text-center bg-secondary-subtle rounded-top-4">
			{items.map((i) => (
				<Link
					key={i.label}
					href={i.href}
					className="px-4 pt-1 pb-2 text-dark text-decoration-none"
				>
					<div
						className="d-flex justify-content-center align-items-end"
						style={{ height: "36px" }}
					>
						<Icon
							path={i.icon}
							size={i.iconSize}
							style={{
								position: "relative",
								top: i.iconOffsetY,
							}}
						/>
					</div>
					<small>{i.label}</small>
				</Link>
			))}
		</div>
	);
}

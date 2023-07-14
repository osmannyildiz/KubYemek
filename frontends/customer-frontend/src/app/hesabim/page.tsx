"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "react-bootstrap";

export default function MyAccountPage() {
	const { logout } = useAuthContext();

	return (
		<>
			<h1>Hesabım</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam officia
				debitis quasi perferendis recusandae, impedit, non beatae deserunt
				quisquam aliquam exercitationem fugit iste. Nihil, quia minima hic est
				et non.
			</p>
			<Button type="button" variant="danger" onClick={() => logout()}>
				Çıkış Yap
			</Button>
		</>
	);
}

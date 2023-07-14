import { useAuthContext } from "@/contexts/AuthContext";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
	children: React.ReactNode;
}

export default function RouteGuard({ children }: Props) {
	const { isAutoLoginAttempted, isLoggedIn, tryAutoLogin } = useAuthContext();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!isLoggedIn) {
			tryAutoLogin();
		}
	}, []); /* eslint-disable-line react-hooks/exhaustive-deps */

	useEffect(() => {
		switch (pathname) {
			case "/giris-yap":
			case "/kayit-ol":
				if (isLoggedIn) {
					router.replace("/");
				}
				break;

			case "/":
			case "/urunler":
			case "/sepetim":
				break;

			default:
				if (isAutoLoginAttempted && !isLoggedIn) {
					router.push("/giris-yap");
				}
		}
	}, [pathname, isLoggedIn, isAutoLoginAttempted, router]);

	return (
		<>
			{isAutoLoginAttempted ? (
				children
			) : (
				<Icon
					path={mdiLoading}
					size={8}
					spin
					className="d-block mx-auto mt-5"
				/>
			)}
		</>
	);
}

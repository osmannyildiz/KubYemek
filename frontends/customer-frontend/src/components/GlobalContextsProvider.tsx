import { AuthContext, buildAuthContextValue } from "@/contexts/AuthContext";

interface Props {
	children: React.ReactNode;
}

export default function GlobalContextsProvider({ children }: Props) {
	const authContextValue = buildAuthContextValue();

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}

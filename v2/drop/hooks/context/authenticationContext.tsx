import axios from "axios";
import { createContext, useContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";

export type User = {
	email: string;
	username: string;
	token: string;
};

type LoginProp = {
	email: string;
	password: string;
};

type RegisterProp = {
	username: string;
	email: string;
	password: string;
};

type AuthenticationContextType = {
	session: string | null;
	login: ({ email, password }: LoginProp) => Promise<void>;
	register: ({ username, email, password }: RegisterProp) => void;
	logout: () => void;
	loading: boolean;
};

const AuthenticationContext = createContext<AuthenticationContextType>({
	session: null,
	login: ({ email, password }: LoginProp) => Promise.resolve(),
	register: ({ username, email, password }: RegisterProp) => Promise.resolve(),
	logout: () => null,
	loading: false,
});

export function useSession() {
	const contextValue = useContext(AuthenticationContext);
	if (process.env.NODE_ENV === "development" && contextValue === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return contextValue;
}

export const AuthenticationProvider = (props: PropsWithChildren) => {
	const [[loading, session], setSession] = useStorageState("session");

	const API_URI = process.env.EXPO_PUBLIC_API_URL as string;

	const signInUserAccount = async ({
		email,
		password,
	}: LoginProp): Promise<void> => {
		try {
			const res = await axios.post(
				`${API_URI}login-account`,
				{
					email: email,
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const value = {
		session,
		login: signInUserAccount,
		register: (): void => {},
		logout: () => {
			setSession(null);
		},
		loading,
	};
	return (
		<AuthenticationContext.Provider value={value}>
			{props.children}
		</AuthenticationContext.Provider>
	);
};

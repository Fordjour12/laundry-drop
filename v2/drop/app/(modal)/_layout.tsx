import { useSession } from "@/hooks/context/authenticationContext";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
	const { session } = useSession();

	if (session) {
		console.log(session);
		return <Redirect href={"/(tabs)/"} />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="register"
				options={{
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="sign-in"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}

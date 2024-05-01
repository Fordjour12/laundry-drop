import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function ModalLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href={"/profile"} />;
	}
	return (
		<Stack>
			<Stack.Screen
				name="login"
				options={{
					headerTitle: "Login",
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					headerTitle: "Create Account",
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="verify-code"
				options={{ headerTitle: "Verify Code" }}
			/>
		</Stack>
	);
}

import { Stack } from "expo-router";
import React from "react";

export default function ModalLayout() {
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

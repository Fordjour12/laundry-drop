import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function RootAppLayout() {
	const { isSignedIn } = useAuth();
	if (!isSignedIn) {
		return <Redirect href={"/login"} />;
	}
	return (
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen name="two" />
			<Stack.Screen name="profile" />
		</Stack>
	);
}

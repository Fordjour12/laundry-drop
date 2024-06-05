import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Settings",
				}}
			/>
			<Stack.Screen name="address" options={{ title: "Address" }} />
		</Stack>
	);
}

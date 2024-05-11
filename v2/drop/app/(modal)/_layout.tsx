import * as Location from "expo-location";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";

export default function AuthLayout() {

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

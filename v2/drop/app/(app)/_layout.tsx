import { Stack } from "expo-router";

export default function AppLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(modal)" />
			<Stack.Screen name="(root)" />
		</Stack>
	);
}

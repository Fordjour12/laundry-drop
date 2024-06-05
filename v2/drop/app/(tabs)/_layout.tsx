import { Tabs } from "expo-router";
export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Discovery",
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarStyle: {
						display: "none",
					},
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: "Chat",
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarStyle: {
						display: "none",
					},
				}}
			/>
		</Tabs>
	);
}

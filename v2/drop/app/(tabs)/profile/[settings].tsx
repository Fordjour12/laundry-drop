import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileSettings() {
	const { settings } = useLocalSearchParams();
	return (
		<SafeAreaView>
			<Text>{settings}</Text>
		</SafeAreaView>
	);
}

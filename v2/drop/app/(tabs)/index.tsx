import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	return (
		<SafeAreaView>
			<Text style={{ fontFamily: "PoppinsBold", fontSize: 40 }}>
				HomeScreen
			</Text>
		</SafeAreaView>
	);
}

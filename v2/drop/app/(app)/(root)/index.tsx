import { Text, View } from "@/components/Themed";
import React from "react";
import { StyleSheet } from "react-native";

export default function index() {
	return (
		<View style={style.container}>
			<Text>Map View here</Text>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	map: {
		width: "100%",
		height: "100%",
	},
});

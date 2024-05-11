import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function index() {
	return (
		<View style={style.container}>
			<Text>Map View here</Text>

			<Pressable onPress={() => router.push("/profile")}>
				<Text>Go to Profile</Text>
			</Pressable>

			<Pressable onPress={() => router.push("/two")}>
				<Text>Go to Two</Text>
			</Pressable>
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

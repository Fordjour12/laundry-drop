import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
	return (
		<SafeAreaView>
			<Text>chat</Text>

			<Link href={"/category/washing"} push asChild>
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Go to Washing</Text>
				</Pressable>
			</Link>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#007BFF",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginHorizontal: 20,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
	},
});

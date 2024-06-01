import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
	return (
		<View style={styles.container}>
			<TextInput style={styles.searchBar} placeholder="Search" />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	searchBar: {
		height: 40,
		width: "90%",
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingLeft: 10,
	},
});

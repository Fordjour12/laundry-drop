import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Address() {
	const [addresses, setAddresses] = useState([
		{
			id: "1",
			title: "Home",
			description: "123 Main St, City, Country",
			default: true,
		},
		{
			id: "2",
			title: "Work",
			description: "456 Office Rd, City, Country",
			default: false,
		},
		{
			id: "3",
			title: "Parents",
			description: "789 Family Ln, City, Country",
			default: false,
		},
	]);

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Text style={styles.itemTitle}>{item.title}</Text>
			<Text style={styles.itemDescription}>{item.description}</Text>
			{item.default && <Text style={styles.defaultLabel}>Default</Text>}
			<TouchableOpacity style={styles.editButton}>
				<Text style={styles.editButtonText}>Edit</Text>
			</TouchableOpacity>
		</View>
	);
	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.header}>My Addresses</Text>
				<FlatList
					data={addresses}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.list}
				/>
				<TouchableOpacity style={styles.addButton}>
					<Text style={styles.addButtonText}>Add New Address</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	list: {
		flexGrow: 1,
	},
	itemContainer: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 8,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	itemTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	itemDescription: {
		fontSize: 16,
		color: "#666",
	},
	editButton: {
		marginTop: 10,
		backgroundColor: "#6200ea",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		alignSelf: "flex-start",
	},
	editButtonText: {
		color: "#fff",
		fontSize: 14,
	},
	addButton: {
		marginTop: 20,
		backgroundColor: "#6200ea",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	defaultLabel: {
		color: "green",
		fontWeight: "bold",
	},
});

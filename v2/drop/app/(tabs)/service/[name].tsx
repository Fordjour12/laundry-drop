import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

type AddressType = {
	id: string;
	title: string;
	description: string;
	default: boolean;
	addressType: "Home" | "Work" | "Other";
};

const initialAddresses = [
	{
		id: "1",
		title: "Home Address",
		description: "123 Main St, Springfield",
		default: true,
		addressType: "Home",
	},
	{
		id: "2",
		title: "Work Address",
		description: "456 Elm St, Springfield",
		default: false,
		addressType: "Work",
	},
];

export default function Service() {
	const [addresses, setAddresses] = useState(initialAddresses);
	const [newAddress, setNewAddress] = useState({
		id: "",
		title: "",
		description: "",
		default: false,
		addressType: "Home",
	});

	const handleInputChange = (field, value) => {
		setNewAddress({ ...newAddress, [field]: value });
	};

	const handleAddAddress = () => {
		setAddresses([
			...addresses,
			{ ...newAddress, id: Math.random().toString() },
		]);
		setNewAddress({
			id: "",
			title: "",
			description: "",
			default: false,
			addressType: "Home",
		});
	};

	const handleSetDefault = (id) => {
		const updatedAddresses = addresses.map((address) =>
			address.id === id
				? { ...address, default: true }
				: { ...address, default: false },
		);
		setAddresses(updatedAddresses);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Add New Address</Text>
			<TextInput
				style={styles.input}
				placeholder="Title"
				value={newAddress.title}
				onChangeText={(text) => handleInputChange("title", text)}
				placeholderTextColor="#888"
			/>
			<TextInput
				style={styles.input}
				placeholder="Description"
				value={newAddress.description}
				onChangeText={(text) => handleInputChange("description", text)}
				placeholderTextColor="#888"
			/>
			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={newAddress.addressType}
					style={styles.picker}
					onValueChange={(itemValue) =>
						handleInputChange("addressType", itemValue)
					}
				>
					<Picker.Item label="Home" value="Home" />
					<Picker.Item label="Work" value="Work" />
					<Picker.Item label="Other" value="Other" />
				</Picker>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleAddAddress}>
				<Text style={styles.buttonText}>Add Address</Text>
			</TouchableOpacity>

			<Text style={styles.header}>Existing Addresses</Text>
			<FlatList
				data={addresses}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.addressItem}>
						<View style={styles.addressHeader}>
							<Text style={styles.title}>{item.title}</Text>
							<TouchableOpacity
								style={styles.radio}
								onPress={() => handleSetDefault(item.id)}
							>
								<View
									style={[
										styles.radioOuter,
										item.default && styles.radioOuterSelected,
									]}
								>
									{item.default && <View style={styles.radioInner} />}
								</View>
							</TouchableOpacity>
						</View>
						<Text style={styles.description}>{item.description}</Text>
						<Text style={styles.detail}>Type: {item.addressType}</Text>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginVertical: 10,
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		paddingHorizontal: 15,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	pickerContainer: {
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 20,
		backgroundColor: "#fff",
	},
	picker: {
		height: 50,
		width: "100%",
	},
	button: {
		backgroundColor: "#4CAF50",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	addressItem: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		borderColor: "#ddd",
		borderWidth: 1,
	},
	addressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 5,
	},
	detail: {
		fontSize: 14,
		color: "#888",
	},
	radio: {
		flexDirection: "row",
		alignItems: "center",
	},
	radioOuter: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#888",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 5,
	},
	radioOuterSelected: {
		borderColor: "#4CAF50",
	},
	radioInner: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: "#4CAF50",
	},
	radioText: {
		fontSize: 16,
		color: "#333",
	},
});

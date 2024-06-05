// biome-ignore lint/style/useImportType: <explanation>
import CustomBackdrop from "@/components/ui/BottomSheetBackDrop";
import TextInputWithLabel from "@/components/ui/TextInput";
import Separator from "@/components/ui/separator";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

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

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["25%", "55%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handlePresentModal = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);

	const handleClosePress = useCallback(() => {
		bottomSheetRef.current?.dismiss();
	}, []);

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Text style={styles.itemTitle}>{item.title}</Text>
			<Text style={styles.itemDescription}>{item.description}</Text>
			{item.default && <Text style={styles.defaultLabel}>Default</Text>}

			<View style={{ flexDirection: "row", gap: 10 }}>
				<Pressable style={styles.editButton}>
					<Text style={styles.editButtonText}>Edit</Text>
				</Pressable>
				<Pressable style={styles.editButton}>
					<Text style={styles.editButtonText}>Remove</Text>
				</Pressable>
			</View>
		</View>
	);
	return (
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<Text style={styles.header}>My Addresses</Text>
				<FlatList
					data={addresses}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.list}
				/>
				<Pressable style={styles.addButton} onPress={handlePresentModal}>
					<Text style={styles.addButtonText}>Add New Address</Text>
				</Pressable>
			</View>
			<BottomSheetModal
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				index={1}
				onChange={handleSheetChanges}
				backdropComponent={CustomBackdrop}
			>
				<BottomSheetView>
					<View>
						<Text>Address details</Text>
						<Text>Complete address would assist better us in serving you</Text>
					</View>
					<Separator height={2} />
					<View style={{ marginHorizontal: 16 }}>
						<TextInputWithLabel />
						<TextInputWithLabel />
						<TextInputWithLabel />
						{/* <Button title="Save Address" onPress={handleClosePress} /> */}
					</View>
					<Pressable
						style={[styles.addButton, { marginHorizontal: 16 }]}
						onPress={handleClosePress}
					>
						<Text style={styles.addButtonText}>Save Address</Text>
					</Pressable>
				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
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

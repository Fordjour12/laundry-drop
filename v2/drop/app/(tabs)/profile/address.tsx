import { BottomSheetHeader } from "@/components/BottomSheetHeader";
import CustomBackdrop from "@/components/ui/BottomSheetBackDrop";
import MultilineTextInput from "@/components/ui/MultiLineTextInput";
import TextInput2 from "@/components/ui/TextInput2";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetScrollView,
	type BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import type React from "react";
import {
	useCallback,
	useMemo,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";

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
	const snapPoints = useMemo(() => ["25%", "59%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handlePresentModal = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);

	const Header = () => (
		<View>
			<Text style={{ fontFamily: "PoppinsBold", fontSize: 30 }}>
				Address Details
			</Text>
			<Text>Complete address would assist better us in serving you</Text>
		</View>
	);

	const renderBottomSheetHeader = useCallback(
		(
			props: React.JSX.IntrinsicAttributes & {
				children?: React.ReactNode | React.ReactNode[];
			} & BottomSheetHandleProps,
		) => (
			<BottomSheetHeader {...props}>
				<Header />
			</BottomSheetHeader>
		),
		[],
	);

	// type LabelType = "Home" | "Work" | "Parents" | "Others";

	type AddAddressRequestProp = {
		// label: LabelType;
		address: string;
		isDefault: boolean;
		userId: number;
		recipient: string;
	};

	const API = process.env.EXPO_PUBLIC_API_URL as string;

	const AddAddressRequest = async ({
		recipient,
		// label,
		address,
		isDefault,
		userId,
	}: AddAddressRequestProp) => {
		const request = await axios.post<AddAddressRequestProp>(
			`${API}create-location/${userId}`,
			{
				// label: label,
				address: address,
				isDefault: isDefault,
				recipients: recipient,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (request.status === 201) {
			console.log("Address added successfully");
			bottomSheetRef.current?.dismiss();
		}
	};

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

	const [newAddress, setNewAddresses] = useState<string>("");
	const [recipient, setRecipient] = useState<string>("");

	const handleTextChange = (setter: Dispatch<SetStateAction<string>>) => {
		return (value: string) => {
			setter(value);
		};
	};

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
				animateOnMount={true}
				onChange={handleSheetChanges}
				backdropComponent={CustomBackdrop}
				handleComponent={renderBottomSheetHeader}
			>
				<BottomSheetScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainer}
				>
					<View>
						<TextInput2
							label="Recipient Name"
							value={recipient}
							placeholder="Type recipient name"
							onChangeText={handleTextChange(setRecipient)}
						/>
						<MultilineTextInput
							label="Your Address"
							placeholder="Type your address here..."
							value={newAddress}
							onChangeText={handleTextChange(setNewAddresses)}
						/>
					</View>
					<Pressable
						style={[styles.addButton, { marginHorizontal: 16 }]}
						onPress={() => {
							AddAddressRequest({
								recipient,
								address: newAddress,
								isDefault: false,
								userId: 1,
							});
						}}
					>
						<Text style={styles.addButtonText}>Save Address</Text>
					</Pressable>
				</BottomSheetScrollView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}
const styles = StyleSheet.create({
	container: {
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
	input: {
		width: "100%",
		paddingVertical: 12,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		fontSize: 16,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		borderWidth: 1,
		borderColor: "#ddd",
		marginHorizontal: 16,
		marginBottom: 10,
	},
	contentContainer: {
		backgroundColor: "#f5f5f5",
		paddingBottom: 20,
	},
});

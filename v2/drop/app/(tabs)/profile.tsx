import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Button,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
	};

	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<SafeAreaView>
			{/* <Text>Profile</Text> */}
			<ScrollView>
				<View style={styles.container}>
					{/* <Image source={{ uri: user.avatar }} style={styles.avatar} /> */}
					<View style={styles.avatar} />
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.email}>{user.email}</Text>
					<View style={styles.icons}>
						<FontAwesome
							name="facebook-square"
							size={30}
							color="#3b5998"
							style={styles.icon}
						/>
						<FontAwesome
							name="twitter"
							size={30}
							color="#00acee"
							style={styles.icon}
						/>
						<FontAwesome
							name="instagram"
							size={30}
							color="#C13584"
							style={styles.icon}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button title="Edit Profile" onPress={() => {}} />
					</View>
				</View>

				<View style={[styles.container_as]}>
					<View style={[styles.section]}>
						<Text style={[styles.sectionTitle]}>Appearance</Text>
						<View style={styles.item}>
							<Text style={[styles.itemText]}>Dark Mode</Text>
							<Switch value={isDarkMode} />
						</View>
					</View>

					<View style={[styles.section, isDarkMode && styles.darkSection]}>
						<Text style={[styles.sectionTitle]}>Notifications</Text>
						<TouchableOpacity style={styles.item}>
							<Text style={[styles.itemText]}>Notification Settings</Text>
						</TouchableOpacity>
					</View>

					<View style={[styles.section]}>
						<Text style={[styles.sectionTitle]}>Security</Text>
						<TouchableOpacity style={styles.item}>
							<Text style={[styles.itemText]}>Change Password</Text>
						</TouchableOpacity>
					</View>

					<View style={[styles.section]}>
						<Text style={[styles.sectionTitle]}>Help</Text>
						<TouchableOpacity style={styles.item}>
							<Text style={[styles.itemText]}>Help Center</Text>
						</TouchableOpacity>
					</View>

					<View style={[styles.section]}>
						<Text style={[styles.sectionTitle]}>About</Text>
						<TouchableOpacity style={styles.item}>
							<Text style={[styles.itemText]}>About Us</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f5f5f5",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
		backgroundColor: "gray",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	email: {
		fontSize: 16,
		color: "gray",
		marginBottom: 20,
	},
	icons: {
		flexDirection: "row",
		marginBottom: 20,
	},
	icon: {
		marginHorizontal: 10,
	},
	buttonContainer: {
		marginTop: 20,
		width: "80%",
	},
	// testing
	container_as: {
		// flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	darkContainer: {
		backgroundColor: "#333",
	},
	section: {
		marginBottom: 30,
	},
	darkSection: {
		backgroundColor: "#444",
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#000",
	},
	darkSectionTitle: {
		color: "#fff",
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	darkItem: {
		borderBottomColor: "#555",
	},
	itemText: {
		fontSize: 16,
		color: "#000",
	},
	darkItemText: {
		color: "#fff",
	},
});

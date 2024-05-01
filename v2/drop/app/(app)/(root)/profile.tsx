import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet,  TouchableOpacity, } from "react-native";
import { Text, View } from "@/components/Themed";
// import { log } from "../../logger";

export default function Page() {
	const { getToken, signOut, isSignedIn } = useAuth();
	const { user } = useUser();
	const [sessionToken, setSessionToken] = React.useState("");

	const onSignOutPress = async () => {
		try {
			await signOut();
		} catch (err) {
			// console.error(err.error[0].message);
			console.error("Error:> " + err?.status || "");
			console.error(
				"Error:> " + err?.errors ? JSON.stringify(err.errors) : err,
			);
		}
	};

	React.useEffect(() => {
		const scheduler = setInterval(async () => {
			const token = await getToken();
			setSessionToken(token as string);
		}, 1000);

		return () => clearInterval(scheduler);
	}, [getToken]);

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Profile",
				}}
			/>
			<Text style={styles.title}>Hello {user?.firstName}</Text>
			<TouchableOpacity onPress={onSignOutPress} style={styles.link}>
				<Text style={styles.linkText}>Sign out</Text>
			</TouchableOpacity>
			<Text style={styles.token}>{sessionToken}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
	token: {
		marginTop: 15,
		paddingVertical: 15,
		fontSize: 15,
	},
});

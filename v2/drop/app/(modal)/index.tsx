import { Button, ButtonOutline } from "@/components/ui/Button";
import { router } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function Index() {
	const backgroundImage = require("../../assets/images/laundry.jpg");

	return (
		<ImageBackground source={backgroundImage} style={styles.container}>
			<View style={{ flex: 1 }} />
			<View>
				<Button
					title="Continue"
					onPress={() => router.push("/(modal)/register")}
				/>

				<View style={{ marginVertical: 16 }} />

				<ButtonOutline
					title="Login to your account"
					onPress={() => router.push("/(modal)/sign-in")}
				/>
			</View>
		</ImageBackground>
	);

	// return (
	// 	<ImageBackground source={backgroundImage} style={styles.container}>
	// 		<View style={{ flex: 1 }} />

	// 		<View style={{ flex: 0.3 }}>
	// 			{/* <Text>Welcome to Drop!</Text> */}

	// 			<View style={{ marginHorizontal: 16 }}>
	// 				<Button
	// 					title="Continue"
	// 					onPress={() => router.push("/(modal)/register")}
	// 				/>
	// 				<View style={{ marginVertical: 8 }} />
	// 				<ButtonOutline
	// 					title="Login to your account"
	// 					onPress={() => {
	// 						router.push("/(modal)/sign-in");
	// 					}}
	// 				/>
	// 			</View>
	// 		</View>
	// 	</ImageBackground>
	// );
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// });

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "grey",
	},
	contentContainer: {
		// flex: 1,
		// alignItems: "center",
		justifyContent: "center",
	},
	input: {
		marginTop: 8,
		marginBottom: 10,
		borderRadius: 10,
		fontSize: 16,
		lineHeight: 20,
		padding: 8,
		backgroundColor: "rgba(151, 151, 151, 0.25)",
	},
});

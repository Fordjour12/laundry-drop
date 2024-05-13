import { Button } from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInput";
import { AppColor } from "@/constants/Colors";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Register() {
	const backgroundImage = require("../../assets/images/laundry.jpg");

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) =>
			setter(text);

	return (
		<ImageBackground
			source={backgroundImage}
			imageStyle={styles.image}
			style={styles.container}
		>
			<View style={{ flex: 0.4 }} />
			<View style={styles.blurBackdrop}>
				<Text style={styles.heading}>Create an account</Text>
				<View style={{ flex: 0.7 }}>
					<TextInputWithLabel
						label="Username"
						style={styles.text}
						onChangeText={handleInputChange(setUsername)}
						value={username}
					/>
					<TextInputWithLabel
						label="Email"
						style={styles.text}
						onChangeText={handleInputChange(setEmail)}
						value={email}
					/>
					<TextInputWithLabel
						label="Password"
						secureTextEntry
						style={styles.text}
						onChangeText={handleInputChange(setPassword)}
						value={password}
					/>
					<View style={{ marginTop: 20, marginBottom: 10 }}>
						<Button title="Sign Up" />
					</View>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		opacity: 1,
	},
	blurBackdrop: {
		// ...StyleSheet.absoluteFillObject,
		backgroundColor: "hsla(173, 32%, 32%,0.8)",
		borderTopEndRadius: 20,
		borderTopStartRadius: 20,
		flex: 1,
		padding: 14,
	},
	heading: {
		fontSize: 30,
		fontWeight: "900",
		color: AppColor[300],
		paddingBottom: 20,
	},
	text: {
		fontWeight: "600",
		color: AppColor[300],
	},
});

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingHorizontal: 16,
// 		paddingTop: 30,

// 	},
// 	separatorView: {
// 		flexDirection: "row",
// 		gap: 10,
// 		alignItems: "center",
// 		marginVertical: 30,
// 	},
// 	text: {
// 		fontWeight: "600",
// 		color: AppColor[300],
// 	},
// });

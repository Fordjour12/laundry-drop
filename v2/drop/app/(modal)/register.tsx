import { Button, ButtonWithIcon } from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInput";
import Separator from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { AppColor } from "@/constants/Colors";
import { useSession } from "@/hooks/context/authenticationContext";
import { Redirect } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

type RegisterProps = {
	username: string;
	email: string;
	password: string;
};

export default function Register() {
	const backgroundImage = require("../../assets/images/laundry.jpg");

	const { register, session } = useSession();

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const API_URI = process.env.EXPO_PUBLIC_API_URL as string;

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(text: string) => {
			setter(text);
		};

	const registerAccount = async ({
		username,
		email,
		password,
	}: RegisterProps) => {
		setIsLoading(true);
		register({
			username: username,
			email: email,
			password: password,
		});
		setIsLoading(false);
	};

	if (session) {
		return <Redirect href={"/(tabs)/"} />;
	}
	// const registerUserAccount = async ({
	// 	username,
	// 	email,
	// 	password,
	// }: RegisterProps) => {
	// 	setIsLoading(true);
	// 	try {
	// 		const res = await axios.post(
	// 			`${API_URI}create-account`,
	// 			{
	// 				username: username,
	// 				email: email,
	// 				password: password,
	// 			},
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			},
	// 		);
	// 		console.log(res.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

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

					{isLoading ? (
						<Spinner />
					) : (
						<Button
							title="Sign Up"
							onPress={() => registerAccount({ username, email, password })}
						/>
					)}

					<View style={styles.separatorView}>
						<Separator height={3} color={AppColor[100]} />
						<Text style={styles.text}>or</Text>
						<Separator height={3} color={AppColor[100]} />
					</View>

					<View style={{ marginTop: 20, marginBottom: 10 }}>
						<ButtonWithIcon title="Continue with Google" iconName="google" />
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
		borderTopEndRadius: 25,
		borderTopStartRadius: 25,
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
	separatorView: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 20,
	},
});

import { Button, ButtonWithIcon } from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInput";
import Separator from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { AppColor } from "@/constants/Colors";
import { useSession } from "@/hooks/context/authenticationContext";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

type SignInProps = {
	email: string;
	password: string;
};

export default function SignIn() {
	const backgroundImage = require("../../assets/images/laundry.jpg");

	const { login } = useSession();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const API_URI = process.env.EXPO_PUBLIC_API_URL as string;
	console.log(API_URI);

	//TODO: Test this logic
	const handleInputChange = (
		setter: React.Dispatch<React.SetStateAction<string>>,
	) => {
		return (text: string) => {
			setter(text);
		};
	};
	const signInUserAccount = async ({ email, password }: SignInProps) => {
		setIsLoading(true);
		await login({
			email: email,
			password: password,
		});
		setIsLoading(false);
	};

	return (
		<ImageBackground
			source={backgroundImage}
			imageStyle={styles.image}
			style={styles.container}
		>
			<View style={{ flex: 0.5 }} />
			<View style={styles.blurBackdrop}>
				<Text style={styles.heading}>Login your account</Text>
				<View style={{ flex: 0.7 }}>
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
							title="Log In"
							onPress={() => signInUserAccount({ email, password })}
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

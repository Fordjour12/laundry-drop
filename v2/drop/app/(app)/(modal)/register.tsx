import { Button, ButtonWithIcon } from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInput";
import Separator from "@/components/ui/separator";
import { shark300, shark600 } from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// enum OAuthStrategy {
// 	Google = "oauth_google",
// 	Facebook = "oauth_facebook",
// 	Apple = "oauth_apple",
// }

export default function Register() {
	// useWarmUpBrowser();

	// const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
	// const { startOAuthFlow: facebookAuth } = useOAuth({
	// 	strategy: "oauth_facebook",
	// });
	// const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

	// const onSelectedAuth = async (strategy: OAuthStrategy) => {
	// 	const selectedAuth = {
	// 		[OAuthStrategy.Google]: googleAuth,
	// 		[OAuthStrategy.Facebook]: facebookAuth,
	// 		[OAuthStrategy.Apple]: appleAuth,
	// 	}[strategy];

	// 	try {
	// 		const { createdSessionId, setActive } = await selectedAuth();
	// 		if (createdSessionId) {
	// 			setActive?.({ session: createdSessionId });

	// 			// TODO: set router here
	// 		}
	// 	} catch (error) {
	// 		console.error("Error starting OAuth flow", error);
	// 	}
	// };

	const [emailAddress, setEmailAddress] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { isLoaded, signUp } = useSignUp();

	const createNewUserAccount = useCallback(async () => {
		if (!isLoaded) return;

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});
			router.replace("/verify-code");
		} catch (err) {
			console.error(err);
		}
	}, [emailAddress, password, isLoaded, signUp]);

	return (
		<View style={styles.container}>
			<TextInputWithLabel
				placeholder="email"
				style={styles.text}
				onChangeText={(email) => setEmailAddress(email)}
			/>
			<TextInputWithLabel
				placeholder="password"
				secureTextEntry
				style={styles.text}
				onChangeText={(password) => setPassword(password)}
			/>

			<View style={{ marginTop: 20, marginBottom: 10 }}>
				<Button title="Sign Up" onPress={createNewUserAccount} />
			</View>

			<View style={styles.separatorView}>
				<Separator height={2} />
				<Text style={styles.text}>or</Text>
				<Separator height={2} />
			</View>

			<View style={{ gap: 25, marginVertical: 40 }}>
				<ButtonWithIcon title="Continue with Phone" iconName="phone" />
				<ButtonWithIcon
					title="Continue with Google"
					iconName="google"
					// onPress={() => onSelectedAuth(OAuthStrategy.Google)}
				/>
				<ButtonWithIcon
					title="Continue with Facebook"
					iconName="facebook"
					// onPress={() => onSelectedAuth(OAuthStrategy.Facebook)}
				/>
			</View>
			<View style={styles.separatorView}>
				<TouchableOpacity
					onPress={() => router.push("/(app)/(modal)/login")}
				>
					<Text style={styles.text}>Do have an account?</Text>
					<Text style={[styles.text, { color: shark600 }]}>
						Sign In
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	separatorView: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 30,
	},
	text: {
		color: shark300,
	},
});

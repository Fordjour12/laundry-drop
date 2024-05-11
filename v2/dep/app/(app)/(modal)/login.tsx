import { Button, ButtonWithIcon } from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInput";
import Separator from "@/components/ui/separator";
import { shark600 } from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

enum OAuthStrategy {
	Google = "oauth_google",
	Facebook = "oauth_facebook",
	// Apple = "oauth_apple",
}

export default function Login() {
	useWarmUpBrowser();
	const router = useRouter();
	const { startOAuthFlow: googleAuth } = useOAuth({
		strategy: "oauth_google",
	});
	const { startOAuthFlow: facebookAuth } = useOAuth({
		strategy: "oauth_facebook",
	});
	// const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

	const onSelectedAuth = async (strategy: OAuthStrategy) => {
		const selectedAuth = {
			[OAuthStrategy.Google]: googleAuth,
			[OAuthStrategy.Facebook]: facebookAuth,
			// [OAuthStrategy.Apple]: appleAuth,
		}[strategy];

		try {
			const { createdSessionId, setActive } = await selectedAuth();
			if (createdSessionId) {
				setActive?.({ session: createdSessionId });
				console.log("createdSessionId", createdSessionId);
			}
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.error(error.errors[0].message);
			console.error("Error starting OAuth flow", error);
		}
	};

	// const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
	// const router = useRouter();

	// const onPress = React.useCallback(async () => {
	// 	try {
	// 		const { createdSessionId, signIn, signUp, setActive } =
	// 			await startOAuthFlow();

	// 		console.log("createdSessionId", createdSessionId);

	// 		if (createdSessionId && setActive) {
	// 			await setActive({ session: createdSessionId });
	// 			router.back();
	// 		}
	// 	} catch (err) {
	// 		console.error("OAuth error", err);
	// 	}
	// }, [startOAuthFlow]);

	const { signIn, setActive, isLoaded } = useSignIn();

	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");

	const onSignInPress = React.useCallback(async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password,
			});

			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			console.error(err.errors[0].message);
			console.error(`Error:> ${err?.status}` || "");
			console.error(
				// biome-ignore lint/correctness/noConstantCondition: <explanation>
				`Error:> ${err?.errors}` ? JSON.stringify(err.errors) : err,
			);
		}
	}, [isLoaded, emailAddress, password, setActive, signIn]);

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
				<Button title="Login" onPress={onSignInPress} />
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
					onPress={() => onSelectedAuth(OAuthStrategy.Google)}
				/>
				<ButtonWithIcon
					title="Continue with Facebook"
					iconName="facebook"
					// onPress={() => onSelectedAuth(OAuthStrategy.Facebook)}
				/>
			</View>
			<View style={styles.separatorView}>
				<TouchableOpacity
					onPress={() => router.push("/(app)/(modal)/register")}
				>
					<View style={{ flexDirection: "row", gap: 4 }}>
						<Text style={styles.text}>Don't have an account?</Text>
						<Text style={[styles.text, { color: shark600 }]}>
							Sign Up
						</Text>
					</View>
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
		color: shark600,
	},
});

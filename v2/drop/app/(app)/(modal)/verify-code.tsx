import { Text, View } from "@/components/Themed";
import { ButtonWithIcon } from "@/components/ui/Button";
import PinInput from "@/components/ui/PinInput";
import Separator from "@/components/ui/separator";
import { useSignUp } from "@clerk/clerk-expo";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// import { styles } from "../../components/Styles";
// import { log } from "../../logger";

export default function Page() {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [code, setCode] = React.useState("");

	const verifyEmailCode = React.useCallback(async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification(
				{
					code,
				},
			);

			await setActive({
				session: completeSignUp.createdSessionId,
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			console.error(err.errors[0].message);
		}
	}, [isLoaded, code, signUp, setActive]);

	const handlePinChange = (pin: string) => {
		setCode(pin);
	};

	console.log(code);
	return (
		<View style={styles.container}>
			<View style={{ marginHorizontal: 10 }}>
				<Text style={styles.header}>Email Verification</Text>
				<Text style={{ paddingVertical: 10, fontSize: 17 }}>
					We have just sent a 6-digit verification code to your email
					address someth*****
				</Text>
			</View>
			<Separator />
			<PinInput length={6} onPinChange={handlePinChange} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					paddingVertical: 40,
				}}
			>
				<Text>Didn't receive the code?{"  "}</Text>
				<TouchableOpacity>
					<Text style={{ fontWeight: "bold" }}>Resend</Text>
				</TouchableOpacity>
			</View>

			<View style={{ marginVertical: 40 }}>
				<ButtonWithIcon
					iconName="chevron-right"
					title="Verify Email"
					onPress={verifyEmailCode}
				/>
			</View>
			<Separator />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// paddingHorizontal: 10,
	},
	header: {
		fontSize: 30,
		fontWeight: "bold",
	},
});

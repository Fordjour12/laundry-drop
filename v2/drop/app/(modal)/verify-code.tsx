import { Button } from "@/components/ui/Button";
import PinInput from "@/components/ui/PinInput";
import Separator from "@/components/ui/separator";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyCode() {
	const [code, setCode] = React.useState("");
	const handlePinChange = (pin: string) => {
		setCode(pin);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginHorizontal: 10 }}>
				<Text style={styles.header}>Email Verification</Text>
				<Text style={{ paddingVertical: 10, fontSize: 17 }}>
					We have just sent a 6-digit verification code to your email address
					someth*****
				</Text>
			</View>
			<PinInput length={6} onPinChange={handlePinChange} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					paddingVertical: 40,
				}}
			>
				<Text style={{ fontFamily: "Poppins" }}>
					Didn't receive the code?{"  "}
				</Text>
				<TouchableOpacity>
					<Text style={{ fontWeight: "bold" }}>Resend</Text>
				</TouchableOpacity>
			</View>

			<View style={{ marginVertical: 40 }}>
				<Button title="Verify Email" />
			</View>
			<Separator />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	header: {
		fontSize: 30,
		fontWeight: "bold",
	},
});

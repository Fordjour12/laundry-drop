import { View } from "@/components/Themed";
import { shark300, shark700 } from "@/constants/Colors";
import type React from "react";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

interface PinInputProps extends TextInputProps {
	length: number; // Length of the PIN
	onPinChange?: (pin: string) => void; // Callback for PIN change
}

const PinInput = ({ length, onPinChange, ...rest }: PinInputProps) => {
	const [pin, setPin] = useState<string[]>(new Array(length).fill(""));
	const inputRefs = useRef<TextInput[]>([]);

	const handlePinChange = (index: number, value: string) => {
		const newPin = [...pin];
		newPin[index] = value;
		setPin(newPin);

		if (value !== "" && index < length - 1) {
			// Move focus to the next input field if available
			inputRefs.current[index + 1]?.focus();
		}

		onPinChange?.(newPin.join(""));
	};

	const handleKeyPress = (index: number, key: string) => {
		// Clear the current input field if backspace is pressed
		if (key === "Backspace" && index > 0 && pin[index] === "") {
			const newPin = [...pin];
			newPin[index - 1] = "";
			setPin(newPin);
			inputRefs.current[index - 1]?.focus();
			onPinChange?.(newPin.join(""));
		}
	};

	return (
		<View style={styles.container}>
			{Array.from({ length }, (_, index) => (
				<TextInput
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={`pint-input-${index}`}
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
					style={styles.input}
					onChangeText={(value) => handlePinChange(index, value)}
					onKeyPress={({ nativeEvent: { key } }) =>
						handleKeyPress(index, key)
					}
					value={pin[index]}
					maxLength={1}
					keyboardType="numeric"
					textContentType="oneTimeCode" // Enable auto-fill for OTP codes
					autoFocus={index === 0} // Auto-focus the first input field
					{...rest}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: 40,
		height: 55,
		marginHorizontal: 6,
		borderWidth: 1,
		borderColor: shark700,
		borderRadius: 5,
		textAlign: "center",
		fontSize: 20,
		color: shark300,
	},
});

export default PinInput;

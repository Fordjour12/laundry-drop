import { AppColor } from "@/constants/Colors";
import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	type TextInputProps,
} from "react-native";

type TextInputWithLabelProps = {
	label?: string;
	value?: string;
	placeholder?: string;
	style?: TextInputProps["style"];
} & TextInputProps;

export default function TextInputWithLabel(props: TextInputWithLabelProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				{...props}
				style={[styles.input, props.style]}
				value={props.value}
				placeholder={props.placeholder}
				placeholderTextColor={AppColor[400]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
		fontWeight: "bold",
		color: AppColor[50],
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 12,
		fontSize: 16,
	},
});

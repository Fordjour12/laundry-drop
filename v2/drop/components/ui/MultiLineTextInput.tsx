import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type MultilineTextInputProps = {
	value: string;
	onChangeText: (value: string) => void;
	label: string;
	placeholder: string;
};

const MultilineTextInput = (props: MultilineTextInputProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				placeholderTextColor="#999"
				multiline={true}
				numberOfLines={4}
				value={props.value}
				onChangeText={props.onChangeText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		padding: 10,
	},
	label: {
		alignSelf: "flex-start",
		fontSize: 16,
		color: "#333",
		marginBottom: 10,
	},
	input: {
		width: "100%",
		height: 150,
		backgroundColor: "#fff",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 15,
		fontSize: 16,
		color: "#333",
		textAlignVertical: "top",
	},
});

export default MultilineTextInput;

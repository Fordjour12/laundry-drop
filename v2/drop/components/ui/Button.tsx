import { AppColor } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	type StyleProp,
	type TouchableOpacityProps,
	type ViewStyle,
} from "react-native";

type ButtonProps = {
	title: string;
	style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;

type ButtonWithIconProps = {
	iconName: React.ComponentProps<typeof FontAwesome>["name"];
	title: string;
	style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;

function Icon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={styles.buttonIcon} {...props} />;
}

export function Button(props: ButtonProps) {
	return (
		<TouchableOpacity style={[styles.button, props.style]} {...props}>
			<Text style={styles.buttonText}>{props.title}</Text>
		</TouchableOpacity>
	);
}

export function ButtonWithIcon(props: ButtonWithIconProps) {
	return (
		<TouchableOpacity style={[props.style, styles.btnOutline]} {...props}>
			<Icon name={props.iconName} color={AppColor[400]} />
			<Text style={styles.buttonOutlineText}>{props.title}</Text>
		</TouchableOpacity>
	);
}

export function ButtonOutline(props: ButtonProps) {
	return (
		<TouchableOpacity style={[styles.btnOutline, props.style]} {...props}>
			<Text style={styles.buttonOutlineText}>{props.title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: AppColor[800],
		paddingVertical: 15,
		paddingHorizontal: 24,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 16,
		color: "#fff",
	},
	// buttonRow: {
	btnOutline: {
		backgroundColor: AppColor[50],
		borderWidth: 1,
		borderColor: AppColor[400],
		height: 55,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 24,
	},
	buttonOutlineText: {
		color: AppColor[400],
		fontSize: 16,
		fontWeight: "bold",
	},
	buttonIcon: {
		position: "absolute",
		left: 16,
	},
});

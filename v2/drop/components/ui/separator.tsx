import { AppColor } from "@/constants/Colors";
import type React from "react";
import { StyleSheet, View } from "react-native";

type SeparatorProps = {
	height?: number;
	color?: string;
};

export default function Separator({ height = 1, color = AppColor[900] }) {
	return (
		<View style={[styles.separator, { height, borderBottomColor: color }]} />
	);
}

const styles = StyleSheet.create({
	separator: {
		flex: 1,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});

import {
	BottomSheetHandle,
	type BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import type React from "react";
import { memo } from "react";
import { StyleSheet, Text } from "react-native";

type BottomSheetHeaderProps = {
	children?: React.ReactNode | React.ReactNode[] | string;
} & BottomSheetHandleProps;

export function BottomSheetHeaderHandler({
	children,
	...rest
}: BottomSheetHeaderProps) {
	return (
		<BottomSheetHandle
			style={styles.container}
			indicatorStyle={styles.indicator}
			{...rest}
		>
			{typeof children === "string" ? (
				<Text style={styles.title}>{children}</Text>
			) : (
				children
			)}
		</BottomSheetHandle>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
		zIndex: 9999,
	},
	title: {
		marginTop: 20,
		fontSize: 30,
		lineHeight: 20,
		textAlign: "center",
		fontWeight: "bold",
		fontFamily: "PoppinsBold",
		color: "black",
	},
	indicator: {
		// backgroundColor: 'gray',
		// width: 40,
		height: 4,
		// borderRadius: 3,
		opacity: 0.5,
	},
});

export const BottomSheetHeader = memo(BottomSheetHeaderHandler);

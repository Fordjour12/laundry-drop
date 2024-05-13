import { AppColor } from "@/constants/Colors";
import { LoaderPinwheelIcon } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function Spinner() {
	const spinValue = useRef(new Animated.Value(0));
	useEffect(
		() =>
			Animated.loop(
				Animated.timing(spinValue.current, {
					toValue: 1,
					duration: 3000,
					useNativeDriver: true,
				}),
			).start(),
		[],
	);

	const spin = spinValue.current.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<View style={styles.button}>
			{/* <ActivityIndicator size="small" color={AppColor[300]} /> */}
			<Animated.View
				style={{
					transform: [{ rotate: spin }],
				}}
			>
				<LoaderPinwheelIcon color={AppColor[100]} />
			</Animated.View>
		</View>
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
});

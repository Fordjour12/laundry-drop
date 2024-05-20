import type { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import type React from "react";
import { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";

interface CustomBackgroundProps extends BottomSheetBackgroundProps {}

const CustomBackgroundComponent: React.FC<CustomBackgroundProps> = ({
	style,
	animatedIndex,
}) => {
	//#region styles
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		// @ts-ignore
		backgroundColor: interpolateColor(
			animatedIndex.value,
			[0, 1],
			["red", "#a8b5eb"],
		),
	}));
	const containerStyle = useMemo(
		() => [styles.container, style, containerAnimatedStyle],
		[style, containerAnimatedStyle],
	);
	//#endregion

	// render
	return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export const CustomBackground = memo(CustomBackgroundComponent);

const styles = StyleSheet.create({
	container: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "red",
	},
});

// import type { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
// import type React from "react";
// import { useMemo } from "react";
// import { Animated } from "react-native";
// import { interpolateColor, useAnimatedStyle } from "react-native-reanimated";

// const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
// 	style,
// 	animatedIndex,
// }) => {
// 	const containerAnimatedStyle = useAnimatedStyle(() => ({
// 		backgroundColor: interpolateColor(
// 			animatedIndex.value,
// 			[0, 1],
// 			["#fff", "#000"],
// 		),
// 	}));

// 	const containerStyle = useMemo(
// 		() => [style, containerAnimatedStyle],
// 		[style, containerAnimatedStyle],
// 	);
// 	return <Animated.View style={containerStyle} pointerEvents={"none"} />;
// };

// export default CustomBackground;

// biome-ignore lint/style/useImportType: <explanation>
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
	// animated variables
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			animatedIndex.value,
			[0, 1],
			[0, 1],
			Extrapolation.CLAMP,
		),
	}));

	// styles
	const containerStyle = useMemo(
		() => [
			style,
			{
				// "#a8b5eb"
				backgroundColor: "hsla(0, 0%, 0%, 0.6)",
			},
			containerAnimatedStyle,
		],
		[style, containerAnimatedStyle],
	);

	return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;

// import {
// 	DarkTheme,
// 	DefaultTheme,
// 	ThemeProvider,
// } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { AuthenticationProvider } from "@/hooks/context/authenticationContext";
// import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsSemi: require("../assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<AuthenticationProvider>
				<Slot />
			</AuthenticationProvider>
		</GestureHandlerRootView>
		// <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
		// </ThemeProvider>
	);
}

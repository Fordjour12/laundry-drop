import { Button, ButtonOutline } from "@/components/ui/Button";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Index() {
	const backgroundImage = require("../../assets/images/laundry.jpg");
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["25%", "50%"], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<BottomSheetModalProvider>
			<ImageBackground source={backgroundImage} style={styles.container}>
				<View style={{ flex: 1 }} />
				<View>
					<Button
						title="Continue"
						onPress={() => router.push("/(modal)/register")}
					/>
					<View style={{ marginVertical: 8 }} />
					<View>
						<ButtonOutline
							title="Login to your account"
							onPress={handlePresentModalPress}
						/>

						<BottomSheetModal
							animateOnMount={true}
							ref={bottomSheetModalRef}
							index={1}
							snapPoints={snapPoints}
							onChange={handleSheetChanges}
						>
							<BottomSheetView style={styles.contentContainer}>
								<Text>Awesome 🎉</Text>
							</BottomSheetView>
						</BottomSheetModal>
					</View>
				</View>
			</ImageBackground>
		</BottomSheetModalProvider>
	);

	// return (
	// 	<ImageBackground source={backgroundImage} style={styles.container}>
	// 		<View style={{ flex: 1 }} />

	// 		<View style={{ flex: 0.3 }}>
	// 			{/* <Text>Welcome to Drop!</Text> */}

	// 			<View style={{ marginHorizontal: 16 }}>
	// 				<Button
	// 					title="Continue"
	// 					onPress={() => router.push("/(modal)/register")}
	// 				/>
	// 				<View style={{ marginVertical: 8 }} />
	// 				<ButtonOutline
	// 					title="Login to your account"
	// 					onPress={() => {
	// 						router.push("/(modal)/sign-in");
	// 					}}
	// 				/>
	// 			</View>
	// 		</View>
	// 	</ImageBackground>
	// );
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// });

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function Home() {
	// const icon = require("../../assets/images/pointer.png");
	// const initialRegion = {
	// 	latitude: 7.9465, // Center latitude of Ghana
	// 	longitude: -1.0232, // Center longitude of Ghana
	// 	latitudeDelta: 5.0, // Latitude span of the map
	// 	longitudeDelta: 5.0,
	// };

	// const [location, setLocation] = useState<Location.LocationObject | null>(
	// 	null,
	// );
	// const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// useEffect(() => {
	// 	(async () => {
	// 		const { status } = await Location.requestForegroundPermissionsAsync();
	// 		if (status !== "granted") {
	// 			setErrorMsg("Permission to access location was denied");
	// 			return;
	// 		}

	// 		const location = await Location.getCurrentPositionAsync({});
	// 		setLocation(location);
	// 	})();
	// }, []);

	// let text = "Waiting..";
	// if (errorMsg) {
	// 	text = errorMsg;
	// } else if (location) {
	// 	text = JSON.stringify(location);
	// }
	// console.log("location", location);

	// const camera = {
	// 	center: {
	// 		latitude: location?.coords.latitude || initialRegion.latitude,
	// 		longitude: location?.coords.longitude || initialRegion.longitude,
	// 	},
	// 	pitch: 45, // Tilt of the map
	// 	heading: 90, // Orientation (bearing)
	// 	altitude: 1000, // Altitude of the camera
	// 	zoom: 15, // Zoom level
	// };

	// const userCoords = {
	// 	latitude: location?.coords.latitude || initialRegion.latitude,
	// 	longitude: location?.coords.longitude || initialRegion.longitude,
	// };

	// // ref
	// const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// // variables
	// const snapPoints = useMemo(() => ["25%", "50%"], []);

	// // callbacks
	// const handlePresentModalPress = useCallback(() => {
	// 	bottomSheetModalRef.current?.present();
	// }, []);
	// const handleSheetChanges = useCallback((index: number) => {
	// 	console.log("handleSheetChanges", index);
	// }, []);

	const bottomSheetRef = useRef<BottomSheet>(null);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const snapPoints = useMemo(() => ["15%", "25%", "50%"], []);

	return (
		<View style={{ flex: 1 }}>
			<MapView style={{ flex: 1 }} />
			<BottomSheet
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<View>
					<View style={styles.contentContainer}>
						<Text>Awesome 🎉</Text>
					</View>
				</View>
			</BottomSheet>
		</View>
	);
}
// <BottomSheetModalProvider>
// 	<View style={styles.container}>
// 		<MapView
// 			initialRegion={initialRegion}
// 			camera={camera}
// 			followsUserLocation={true}
// 			provider={PROVIDER_GOOGLE}
// 			style={styles.map}
// 			customMapStyle={gemCstMap}
// 		>
// 			<Marker
// 				coordinate={userCoords}
// 				title={"Marker Title"}
// 				description={text}
// 				icon={icon}
// 			/>
// 		</MapView>
// 		<SafeAreaView style={{ flex: 1, position: "absolute" }}>
// 			<Button onPress={handlePresentModalPress} title="Show Bottom Sheet" />
// 			<BottomSheetModal
// 				ref={bottomSheetModalRef}
// 				index={1}
// 				snapPoints={snapPoints}
// 				onChange={handleSheetChanges}
// 			>
// 				<BottomSheetView style={styles.contentContainer}>
// 					<Text>Awesome 🎉</Text>
// 				</BottomSheetView>
// 			</BottomSheetModal>
// 		</SafeAreaView>
// 	</View>
// </BottomSheetModalProvider>
// );
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	map: {
// 		...StyleSheet.absoluteFillObject,
// 	},
// 	contentContainer: {
// 		flex: 1,
// 		alignItems: "center",
// 	},
// });

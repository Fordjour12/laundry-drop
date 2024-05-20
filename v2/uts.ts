// TODO: Not needed Remove from codebase
// export const cstMap = [
// 	{
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#f4f9f8", // Lightest color
// 			},
// 		],
// 	},
// 	{
// 		elementType: "labels.icon",
// 		stylers: [
// 			{
// 				// visibility: "#ccc",
// 				color: AppColor["400"],
// 			},
// 		],
// 	},
// 	{
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#253c39", // Dark color
// 			},
// 		],
// 	},
// 	{
// 		elementType: "labels.text.stroke",
// 		stylers: [
// 			{
// 				color: "#f4f9f8", // Lightest color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "administrative.land_parcel",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				// color: "#b6d9d0", // Light color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "poi",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#dbece8", // Light color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "poi",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#2f5651", // Darker color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "poi.park",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#8abeb4", // Medium color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "poi.park",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#294643", // Dark color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "road",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#b6d9d0", // Light color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "road.arterial",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#2f5651", // Darker color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "road.highway",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#61a095", // Medium color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "road.highway",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#376a64", // Dark color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "road.local",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#2f5651", // Darker color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "transit.line",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#dbece8", // Light color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "transit.station",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#b6d9d0", // Light color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "water",
// 		elementType: "geometry",
// 		stylers: [
// 			{
// 				color: "#8abeb4", // Medium color
// 			},
// 		],
// 	},
// 	{
// 		featureType: "water",
// 		elementType: "labels.text.fill",
// 		stylers: [
// 			{
// 				color: "#2f5651", // Darker color
// 			},
// 		],
// 	},
// ];

import type BottomSheet from "@gorhom/bottom-sheet";
import type { Text, View } from "lucide-react-native";
import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";

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

	return (
		<View style={styles.container}>
			<BottomSheet
				ref={bottomSheetRef}
	index={1}
	snapPoints={["25%", "50%"]}
	onChange={handleSheetChanges}
			>
				<View>
					<View style={styles.contentContainer}>
						<Text>Awesome
	🎉</Text>
					</View>
				</View>
			</BottomSheet>
		</View>
	)
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

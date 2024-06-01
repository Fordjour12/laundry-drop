import Card from "@/components/ui/Card";
import { customMapStyle } from "@/constants/customMapStyles";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export default function Explore() {
	// const icon = require("../../assets/images/pointer.png");
	const initialRegion = {
		latitude: 7.9465, // Center latitude of Ghana
		longitude: -1.0232, // Center longitude of Ghana
		latitudeDelta: 5.0, // Latitude span of the map
		longitudeDelta: 5.0,
	};

	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	// let text = "Waiting..";
	// if (errorMsg) {
	// 	text = errorMsg;
	// } else if (location) {
	// 	text = JSON.stringify(location);
	// }
	// console.log("location", location);

	const camera = {
		center: {
			latitude: location?.coords.latitude || initialRegion.latitude,
			longitude: location?.coords.longitude || initialRegion.longitude,
		},
		pitch: 45, // Tilt of the map
		heading: 90, // Orientation (bearing)
		altitude: 1000, // Altitude of the camera
		zoom: 15, // Zoom level
	};

	// const userCoords = {
	// 	latitude: location?.coords.latitude || initialRegion.latitude,
	// 	longitude: location?.coords.longitude || initialRegion.longitude,
	// };

	type CardData = {
		id: number;
		title: string;
		description: string;
	};

	const cardData: CardData[] = [
		{
			id: 1,
			title: "Card 1",
			description: "Description for Card 1",
		},
		{
			id: 2,
			title: "Card 2",
			description: "Description for Card 2",
		},
		{
			id: 3,
			title: "Card 3",
			description: "Description for Card 3",
		},
		{
			id: 4,
			title: "Card 4",
			description: "Description for Card 4",
		},
		{
			id: 5,
			title: "Card 5",
			description: "Description for Card 5",
		},
		{
			id: 6,
			title: "Card 6",
			description: "Description for Card 6",
		},
		{
			id: 7,
			title: "Card 7",
			description: "Description for Card 7",
		},
		{
			id: 8,
			title: "Card 8",
			description: "Description for Card 8",
		},
		{
			id: 9,
			title: "Card 9",
			description: "Description for Card 9",
		},
		{
			id: 10,
			title: "Card 10",
			description: "Description for Card 10",
		},
	];

	return (
		<View style={styles.container}>
			<MapView
				initialRegion={initialRegion}
				camera={camera}
				googleRenderer="LATEST"
				customMapStyle={customMapStyle}
				showsCompass={false}
				style={{ flex: 1 }}
			/>
			<ScrollView
				horizontal
				style={{
					paddingVertical: 30,
					position: "absolute",
				}}
			>
				{cardData.map((data: CardData) => (
					<View key={data.id} style={{ marginRight: 10 }}>
						<Card
							key={data.id}
							title={data.title}
							description={data.description}
							price="GHS 100 - GHS 200"
						/>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

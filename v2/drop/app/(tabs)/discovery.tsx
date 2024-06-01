import Card from "@/components/ui/Card";
import SearchBar from "@/components/ui/SearchBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Discovery() {
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

	const username = "Alfred";
	const location = "Dome";
	const district = "Ga East Municipal";
	const city = " Accra";
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ backgroundColor: "gray", paddingVertical: 20 }}>
					<Text
						style={{
							fontFamily: "PoppinsBold",
							fontSize: 22,
						}}
					>
						Welcome, {username}
					</Text>
					<View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
						<FontAwesome name="location-arrow" size={24} color="black" />
						<View>
							<Text
								style={{
									fontFamily: "PoppinsSemi",
									fontWeight: "600",
									fontSize: 13,
								}}
							>
								{location},{city}
							</Text>
							<Text
								style={{
									fontFamily: "PoppinsSemi",
									fontSize: 13,
								}}
							>
								{district}
							</Text>
						</View>
					</View>
					<SearchBar />
				</View>

				<View>
					<Text
						style={{
							fontSize: 20,
							fontFamily: "PoppinsBold",
						}}
					>
						Discovery
					</Text>

					<View>
						<Text
							style={{
								fontFamily: "Poppins",
								fontWeight: "400",
								fontSize: 15,
							}}
						>
							Popular Laundry
						</Text>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ paddingHorizontal: 20, paddingTop: 10 }}
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

					<View>
						<Text
							style={{
								fontFamily: "Poppins",
								fontWeight: "400",
								fontSize: 15,
							}}
						>
							Laundry Products
						</Text>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ paddingHorizontal: 20, paddingTop: 10 }}
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
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

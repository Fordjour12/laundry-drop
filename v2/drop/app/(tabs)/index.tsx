import Card from "@/components/ui/Card";
import SearchBar from "@/components/ui/SearchBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Discovery() {
	type CardData = {
		id: number;
		title: string;
		description: string;
	};

	type LaundryProvider = {
		name: string;

	}

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

	type CategoryData = {
		id: number;
		title: string;
	};
	const categoryData: CategoryData[] = [
		{
			id: 1,
			title: "Washing",
		},
		{
			id: 2,
			title: "Dry Cleaning",
		},
		{
			id: 3,
			title: "Ironing",
		},
		{
			id: 4,
			title: "Products",
		},
		{
			id: 5,
			title: "Bedding",
		},
		{
			id: 6,
			title: "Washing + Ironing",
		},
	];

	const username = "Alfred";
	const location = "Dome";
	const district = "Ga East Municipal";
	const city = " Accra";
	const [searchQuery, setSearchQuery] = useState("");
	const [laundryProvider, setLaundryProvider] = useState([]);

	const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

	useEffect(() => {
		const response = axios
			.get(`${API_URL}get-company`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [API_URL]);

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
						Categories
					</Text>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{ paddingHorizontal: 20, paddingTop: 10 }}
					>
						{categoryData.map((data: CategoryData) => (
							<View key={data.id} style={{ alignItems: "center" }}>
								<View
									style={{
										width: 100,
										height: 100,
										backgroundColor: "gray",
										borderRadius: 10,
										marginRight: 10,
									}}
								/>
								<Text style={{ fontFamily: "PoppinsSemi" }}>{data.title}</Text>
							</View>
						))}
					</ScrollView>
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
										image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
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
										image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
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

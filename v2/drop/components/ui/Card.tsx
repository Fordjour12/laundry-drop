import type React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CardProps {
	title: string;
	description: string;
	price: string;
	image?: string;
}

export default function Card({ image, title, description, price }: CardProps) {
	return (
		<View style={styles.card}>
			<Image source={{ uri: image }} style={styles.image} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.price}>{price}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 10,
		width: 250,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#666",
		marginBottom: 10,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
});

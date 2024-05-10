import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import { styles } from "../../components/Styles";

export default function Page() {
	return (
		<View>
			<Stack.Screen
				options={{
					title: "Home",
				}}
			/>
			<Text>Welcome!</Text>
			<SignedIn>
				<Link href={"/profile"} asChild>
					<TouchableOpacity>
						<Text>Go to Profile</Text>
					</TouchableOpacity>
				</Link>
			</SignedIn>
			<SignedOut>
				<Link href={"/login"}>
					<TouchableOpacity>
						<Text>Sign In</Text>
					</TouchableOpacity>
				</Link>
				<Link href={"/register"} asChild>
					<TouchableOpacity>
						<Text>Sign Up</Text>
					</TouchableOpacity>
				</Link>
			</SignedOut>
		</View>
	);
}

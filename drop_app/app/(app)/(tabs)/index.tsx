import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
  <View>
    <Text>Index</Text>


    <Pressable
        className="bg-teal-600 py-4 mx-4 rounded-lg"
        onPress={() =>
        router.push("/register")
        }
      >
        <Text className="text-white text-center font-bold text-lg">
          Create New Account
        </Text>
      </Pressable>

  </View>
  );
}

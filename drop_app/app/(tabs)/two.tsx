import { Text, View, Pressable, TouchableOpacity } from "react-native";

export default function TabTwoScreen() {
    return (
        <View>
            <Text className="text-teal-600">Hello from tab 2</Text>
            <Pressable className="w-full py-4 text-red-600 bg-red-600" onPress={() => console.log("hello here")}>
                <Text className="text-center text-white py-4 my-4">Login</Text>
            </Pressable>

            <TouchableOpacity className="border-white border w-full py-4 px-6 rounded-lg bg-yellow-500">
                <Text className="text-teal-600">Hellow </Text>
            </TouchableOpacity>
        </View>
    )

}

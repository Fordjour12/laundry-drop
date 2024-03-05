import { useAuth } from "@/context/auth/authContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
    const { onLogout } = useAuth()



    return (

        <SafeAreaView>
            <View>
                <Text>index</Text>

                <Pressable onPress={() => onLogout!()} className="bg-red-600 p-4 w-full " >
                    <Text className="text-white font-bold text-center" >Sign out </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

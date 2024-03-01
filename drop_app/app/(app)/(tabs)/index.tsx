import { useSession } from "@/context/auth/ctx";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const { signOut } = useSession();
  return (
    <SafeAreaView>
      <View>
        <Text>index</Text>
        <Pressable
          onPress={() => {
            signOut();
            router.replace("/sign-in");
          }}
        >
          <Text>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

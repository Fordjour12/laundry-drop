import { FontAwesome } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerRight: () => (
            <Link asChild href="/login">
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome name="plus-circle" size={30} color="white" />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

import { useAuth } from "@/context/auth/authContext";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { session } = useAuth();

  if (session === null) {
    console.log("Redirecting to sign-in", {
      message: "user has no session",
    });
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="two" options={{ headerShown: false }} />
    </Tabs>
  );
}

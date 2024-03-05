import { useAuth } from "@/context/auth/authContext";
import { Redirect } from "expo-router";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
const {session }= useAuth()


if(!session){
    <Redirect href="/sign-in" />
    }


  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="two" options={{ headerShown: false }} />
    </Tabs>
  );
}

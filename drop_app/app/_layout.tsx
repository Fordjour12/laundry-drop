import { AuthContextProvider } from "@/context/auth/authContext";
import "@/global.css";
import { Slot } from "expo-router";
import React from "react";

export default function Root() {
  return (
    <AuthContextProvider>
      <Slot screenOptions={{ headerShown: false }} />
    </AuthContextProvider>
  );
}

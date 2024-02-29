import { SessionProvider } from "@/context/auth/ctx";
import "@/global.css";
import { Slot } from "expo-router";
import React from "react";

export default function Root() {
  return (
    <SessionProvider>
      <Slot screenOptions={{ headerShown: false }} />
    </SessionProvider>
  );
}

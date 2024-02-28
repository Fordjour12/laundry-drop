import { useAuth } from "@/context/auth/authContext";
import { Redirect, Stack } from "expo-router";
import React from "react";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { authState } = useAuth();

  if (authState?.isAuthenticated === false) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}

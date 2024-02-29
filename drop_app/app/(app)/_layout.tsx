import { Stack } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ presentation: "modal" }} />
      <Stack.Screen name="register" options={{ presentation: "modal" }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function AppLayout() {
  <Stack>
    <Stack.Screen name="register" />
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="(tabs)" />
  </Stack>;
}

// export default function RootAppLayout() {
//     return <AppLayout/>
// };

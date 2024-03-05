
import { Stack } from "expo-router";


export {ErrorBoundary} from "expo-router";

export const unstable_settings = {
    initialRouteName: "(tabs)",
    }


export default function RootAppLayout() {
    return <AppLayout />;
    }



function AppLayout() {
return(
  <Stack>
    <Stack.Screen name="register" />
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="(tabs)" />
  </Stack>
  )
}


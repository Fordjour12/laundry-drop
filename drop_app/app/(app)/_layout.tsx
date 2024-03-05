
import { useAuth } from "@/context/auth/authContext";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";


export {ErrorBoundary} from "expo-router";

export const unstable_settings = {
    initialRouteName: "(tabs)",
    }


export default function RootAppLayout() {

    const {session,isLoading }= useAuth()


if(isLoading){
    <Text>Loading...</Text>
    }


if(!session){

<Redirect href="/sign-in" />
    }





    return <AppLayout />;
    }


function AppLayout() {
return <Stack/>
}


{/* <Stack>
    <Stack.Screen name="register" />
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="(tabs)" />
  </Stack>*/}


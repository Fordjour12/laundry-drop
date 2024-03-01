import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useAuth } from "@/context/auth/authContext";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  type RegisterProps = {
    email: string;
    password: string;
    username: string;
  };

  // const handleRegisterTest = async ({
  //   email,
  //   password,
  //   username,
  // }: RegisterProps) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "http://192.168.138.242:5173/api/v1/user/register",
  //       {
  //         email,
  //         password,
  //         username,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data);

  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { onRegister } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text className="text-3xl">Register</Text>
      </View>

      <View className="m-3">
        <Label className="text-black">Username</Label>
        <Input
          keyboardType="default"
          placeholder="username"
          onChangeText={handleUsernameChange}
          autoComplete="name"
          value={username}
        />
      </View>

      <View className="m-3">
        <Label className="text-black">Email</Label>
        <Input
          keyboardType="email-address"
          placeholder="email"
          onChangeText={handleEmailChange}
          autoComplete="email"
          value={email}
        />
      </View>

      <View className="m-3">
        <Label className="text-black">Password</Label>
        <Input
          keyboardType="visible-password"
          secureTextEntry={true}
          placeholder="password"
          onChangeText={handlePasswordChange}
          value={password}
          autoComplete="password"
        />
      </View>

      <Pressable
        className="bg-teal-600 py-4 mx-4 rounded-lg"
        onPress={() =>
          onRegister!(String(email), String(password), String(username))
        }
      >
        <Text className="text-white text-center font-bold text-lg">
          Create New Account
        </Text>
      </Pressable>

      <View className="flex-row items-center justify-center pt-6">
        <Text>Have an account? </Text>
        <Link href="/sign-in" asChild>
          <Pressable>
            <Text className="text-teal-700 font-bold underline">
              Access Account Here
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

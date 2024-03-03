import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text className="text-4xl font-black text-teal-800">Login</Text>
      </View>
      <View className="m-3">
        <Label className="text-black font-semibold">Email</Label>
        <Input
          keyboardType="email-address"
          placeholder="daniel08hoffson@email.com"
          onChangeText={handleEmailChange}
          autoComplete="email"
          value={email}
          className=" border-teal-800"
        />
      </View>

      <View className="m-3">
        <Label className="text-black font-semibold">Password</Label>
        <Input
          keyboardType="default"
          secureTextEntry={true}
          placeholder="password"
          onChangeText={handlePasswordChange}
          value={password}
          autoComplete="password"
          className="border-teal-800"
        />
      </View>

      <Pressable
        className="bg-teal-600 py-4 mx-4 rounded-lg"
        onPress={() => {}}
      >
        <Text className="text-white text-center font-bold text-lg">Login</Text>
      </Pressable>

      <View className="flex-row items-center justify-center pt-6">
        <Text>Don't have an account? </Text>
        <Link href="/register" asChild>
          <Pressable>
            <Text className="text-teal-700 font-bold">Create New Account</Text>
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

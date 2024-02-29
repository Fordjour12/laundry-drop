import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useSession } from "@/context/auth/ctx";
import { router } from "expo-router";
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

  const { signIn } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text className="text-3xl">Login</Text>
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
        onPress={() => {
          signIn();
          router.replace("/(app)/(tabs)/");
        }}
      >
        <Text className="text-white text-center font-bold text-lg">Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

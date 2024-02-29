import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text className="text-3xl">Login</Text>
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

      <Pressable className="bg-teal-600 py-4 mx-4 rounded-lg">
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

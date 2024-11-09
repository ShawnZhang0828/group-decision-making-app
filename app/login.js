import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import authService from "./services/authService";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const login = async () => {
    const role = await authService.authenticate(username, "");
    console.log(role);
    if (role) {
      router.replace({
        pathname: "/home", 
        params: { role }});
    } else {
      Alert.alert("Login failed", "Invalid username");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-blue-100 p-4">
      <Text className="text-3xl font-bold mb-6">Login</Text>
      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-400 rounded-lg p-3 w-3/4 mb-4 bg-white"
      />
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default LoginScreen;

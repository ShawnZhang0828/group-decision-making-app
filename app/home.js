import React from "react";
import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";

const HomeScreen = () => {
    const { role } = useLocalSearchParams();
    const router = useRouter();

    const logout = () => {
        console.log(`role is ${role}`);
        router.replace('/login');
    }

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-4">
            <Text className="text-2xl font-bold mb-4">
                {role === 'Manager' ? 'Manager' : 'Member'}
            </Text>
            {role === 'Manager' && <Text>This is the Manager's dashboard.</Text>}
            {role === 'Member' && <Text>This is the Member's area.</Text>}

            <Button title="Logout" onPress={logout} />
        </View>
    );
}

export default HomeScreen;
import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const CreateNewProblemScreen = () => {
    const router = useRouter();

    const cancel = () => {
        router.replace('/home');
    }

    return (
        <View className="flex-1 justify-center items-center bg-white p-4">
            <TouchableOpacity onPress={cancel}>
                <Image 
                    source={require('../assets/back.png')}
                    style={{ width: 30, height: 30 }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
}

export default CreateNewProblemScreen;

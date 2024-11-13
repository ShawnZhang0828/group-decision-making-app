import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const OpenProblem = () => {
    const { problem } = useLocalSearchParams();

    return (
        <View>

        </View>
    );
}

export default OpenProblem;
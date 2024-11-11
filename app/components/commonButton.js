import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CommonButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="mb-[10%] rounded-lg bg-indigo-200 w-[40%] py-2 self-center"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <Text className="text-black text-lg font-bold text-center">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CommonButton;

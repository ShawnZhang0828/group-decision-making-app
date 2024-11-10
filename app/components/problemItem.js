import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProblemItem = ({ problem }) => {
    const getCompletedNumber = () => {
        return Array.from(problem.participants.values()).filter(completed => completed).length;
    }

    return (
        <TouchableOpacity onPress={() => {}} className="bg-gray-100 rounded-lg p-4 mb-2 shadow-md">
            <Text className="text-lg font-semibold mb-1">{problem.description}</Text>
            <Text className="text-gray-600">Created on: {problem.createdDate}</Text>
            <Text className="text-gray-600">Completed: {getCompletedNumber()} / {problem.participants.size}</Text>
        </TouchableOpacity>
    );
}

export default ProblemItem;
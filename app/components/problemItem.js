import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ProblemItem = ({ problem }) => {
    const router = useRouter();

    const getCompletedNumber = () => {
        return Array.from(problem.participants.values()).filter(
            (completed) => completed
        ).length;
    };

    const problemClicked = () => {
        // stringify problem so that it is passed to future pages correctly
        string_problem = JSON.stringify(problem);
        if (problem.getProblemCompleted()) {
            router.push({
                pathname: "/closedProblem",
                params: { string_problem },
            });
        } else {
            router.push({
                pathname: "/openProblem",
                params: { string_problem },
            });
        }
    };

    return (
        <TouchableOpacity
            onPress={problemClicked}
            className="bg-gray-100 rounded-lg p-4 mb-2 shadow-md gap-2"
        >
            <Text className="text-lg font-semibold mb-1 leading-tight">
                {problem.description}
            </Text>
            <Text className="text-gray-600">
                Created on: {problem.createdDate}
            </Text>
            {problem.getProblemCompleted() ? (
                <Text className="text-gray-600">
                    Decision: {problem.getFinalDecision().content}
                </Text>
            ) : (
                <Text className="text-gray-600">
                    Completed: {getCompletedNumber()} /{" "}
                    {problem.participants.size}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default ProblemItem;

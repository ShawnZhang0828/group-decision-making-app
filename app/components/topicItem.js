import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const TopicItem = ({ topic }) => {
    const router = useRouter();

    const getCompletedNumber = () => {
        return Array.from(topic.participants.values()).filter(
            (completed) => completed
        ).length;
    };

    const topicClicked = () => {
        // stringify topic so that it is passed to future pages correctly
        string_topic = JSON.stringify(topic);
        if (topic.getTopicCompleted()) {
            router.push({
                pathname: "/closedTopic",
                params: { string_topic },
            });
        } else {
            router.push({
                pathname: "/openTopic",
                params: { string_topic },
            });
        }
    };

    return (
        <TouchableOpacity
            onPress={topicClicked}
            className="bg-gray-100 rounded-lg p-4 mb-2 shadow-md gap-2"
        >
            <Text className="text-lg font-semibold mb-1 leading-tight">
                {topic.description}
            </Text>
            <Text className="text-gray-600">
                Created on: {topic.createdDate}
            </Text>
            {topic.getTopicCompleted() ? (
                <Text className="text-gray-600">
                    Decision: {topic.finalDecision.content}
                </Text>
            ) : (
                <Text className="text-gray-600">
                    Completed: {getCompletedNumber()} /{" "}
                    {topic.participants.size}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default TopicItem;

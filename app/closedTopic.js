import React, { useState } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import VoteResult from "./components/voteResult";

const ClosedTopic = () => {
    console.log("Closed Topic Page Rendered");

    const [selectedIndex, setSelectedIndex] = useState(null);

    // accept the topic from route parameters
    const { string_topic } = useLocalSearchParams();
    // reconstruct the topic object
    const topic = JSON.parse(string_topic);

    // get the maximum number of votes among all options
    const maxVoters = topic.options.reduce(
        (max, option) =>
            option.voters.length > max.voters.length ? option : max,
        topic.options[0]
    ).voters.length;

    // get all options that share the maximum number of voters
    const finalDecision = topic.finalDecision;

    return (
        <View className="p-4">
            <View className="flex-col mb-6">
                <Text className="font-bold text-xl">Topic</Text>
                <Text className="text-lg">{topic.description}</Text>
            </View>

            <View className="mb-6">
                <Text className="font-bold text-xl">Final Decision</Text>
                <View className="border-b-2 border-gray-500">
                    <Text className="text-lg">
                        {finalDecision.content}
                    </Text>
                </View>
            </View>

            <VoteResult
                finalDecision={finalDecision.content}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                topic={topic}
                maxVoters={maxVoters}
            />
        </View>
    );
};

export default ClosedTopic;

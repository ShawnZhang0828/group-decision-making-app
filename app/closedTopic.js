import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

import VoteResult from "./components/voteResult";
import CustomizeModal from "./components/customizeModal";

const ClosedTopic = () => {
    console.log("Closed Topic Page Rendered");

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
            {/* Topic Section */}
            <View className="flex-col mb-6">
                <Text className="font-bold text-xl">Topic</Text>
                <Text className="text-lg">{topic.description}</Text>
            </View>

            {/* Creator Section */}
            <View className="flex-col mb-6">
                <Text className="font-bold text-xl">Created By</Text>
                <Text className="text-lg">{topic.creator}</Text>
            </View>

            {/* Final Decision Section */}
            <View className="mb-3">
                <Text className="font-bold text-xl mb-2">Final Decision</Text>
                <View className="flex-row items-center justify-between border-b-2 border-gray-500 pb-1">
                    <Text className="text-lg flex-shrink">
                        {finalDecision.content}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="bg-blue-500 px-4 py-2 rounded-md ml-4"
                    >
                        <Text className="text-white font-bold text-center">
                            Learn More
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Vote Result */}
            <VoteResult
                finalDecision={finalDecision.content}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                topic={topic}
                maxVoters={maxVoters}
            />

            {/* Modal */}
            <CustomizeModal
                visible={modalVisible}
                duration={1000000}
                message="Final Rationale"
                children={
                    <View>
                        <View className="p-4 bg-white rounded-md mb-4 ">
                            <Text className="text-lg text-gray-800 leading-6 ">
                                {topic.finalDecisionRationale}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="bg-blue-500 px-6 py-3 rounded-md self-center mb-1 shadow"
                        >
                            <Text className="text-white font-bold text-center">
                                Got It
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                onHide={() => setModalVisible(false)}
            />
        </View>
    );
};

export default ClosedTopic;

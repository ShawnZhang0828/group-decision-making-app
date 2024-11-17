import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useLocalSearchParams } from "expo-router";

const ClosedTopic = () => {
    console.log("Closed Topic Page Rendered");

    const [selectedIndex, setSelectedIndex] = useState(null);

    // accept the topic from route parameters
    const { string_topic } = useLocalSearchParams();
    // reconstruct the topic object
    const topic = JSON.parse(string_topic);

    const screenWidth = Dimensions.get("window").width;

    // get the maximum number of votes among all options
    const maxVoters = topic.options.reduce(
        (max, option) =>
            option.voters.length > max.voters.length ? option : max,
        topic.options[0]
    ).voters.length;

    // get all options that share the maximum number of voters
    const getFinalDecisions = () => {
        return topic.options.filter(
            (option) => option.voters.length == maxVoters
        );
    };

    // screen configuration for the bar chart
    const chartConfig = {
        chartYSections: maxVoters + (maxVoters >= 3 ? 2 : 1),
        barWidth: 35,
        width: screenWidth * 0.9,
        spacing:
            (screenWidth * 0.75 - topic.options.length * 35) /
            (topic.options.length + 1),
    };

    // construct the data used in the bar chart
    const chartData = Array.from(
        topic.options.map((option) => {
            return {
                value: option.voters.length,
                label: option.content,
                frontColor:
                    option.voters.length == maxVoters ? "#177AD5" : "#c0c2c2",
                showTooltip: true,
            };
        })
    );

    return (
        <View className="p-4">
            <View className="flex-col mb-6">
                <Text className="font-bold text-xl">Topic</Text>
                <Text className="text-lg">{topic.description}</Text>
            </View>

            <View>
                <Text className="font-bold text-xl">Final Decision</Text>
                {getFinalDecisions().map((option, index) => {
                    return (
                        <View
                            className="border-b-2 border-gray-500"
                            key={index}
                        >
                            <Text className="text-lg">
                                {index + 1}. {option.content}
                            </Text>
                        </View>
                    );
                })}
            </View>

            <ScrollView className={`h-[73%] ${selectedIndex !== null ? "border-b-2 border-gray-500" : ""}`}>
                <View className="mt-6">
                    <Text className="font-bold text-lg">Result</Text>
                    <BarChart
                        data={chartData}
                        barWidth={chartConfig["barWidth"]}
                        barBorderRadius={4}
                        noOfSections={chartConfig["chartYSections"]}
                        width={chartConfig["width"]}
                        yAxisThickness={0}
                        height={220}
                        maxValue={chartConfig["chartYSections"]}
                        spacing={chartConfig["spacing"]}
                        leftShiftForTooltip={20}
                        leftShiftForLastIndexTooltip={20}
                        renderTooltip={(_, index) => {
                            const option = topic.options[index];
                            return (
                                <View
                                    className="bg-indigo-100 p-2 rounded-md shadow-inner"
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        transform: [{ translateY: 65 }],
                                        marginBottom: 8, // Slightly larger margin for spacing
                                    }}
                                >
                                    {/* Header */}
                                    <Text className="text-sm font-bold text-center text-gray-700 mb-1">
                                        Voted By
                                    </Text>

                                    {/* List of Voters */}
                                    {option.voters.map((voter, voterIndex) => (
                                        <View
                                            key={voterIndex}
                                            className={`border-b ${
                                                voterIndex ===
                                                option.voters.length - 1
                                                    ? "border-b-0"
                                                    : "border-gray-700"
                                            }`}
                                        >
                                            <Text className="text-sm text-gray-800 text-center">
                                                {voter}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            );
                        }}
                        onPress={(_, index) => {
                            setSelectedIndex(index);
                        }}
                    />
                </View>

                {selectedIndex !== null && (
                    <View className="p-4">
                        {/* Pros Section */}
                        <View className="mb-6">
                            <Text className="font-bold text-xl mb-2 text-green-700">
                                Pros
                            </Text>
                            {topic.options[selectedIndex].pros.map(
                                (pro, index) => (
                                    <View key={index} className="mb-1">
                                        <Text className="font-semibold text-base text-gray-800">
                                            {pro.participant}
                                        </Text>
                                        <Text className="text-sm text-gray-600">
                                            {pro.pro}
                                        </Text>
                                    </View>
                                )
                            )}
                        </View>

                        {/* Cons Section */}
                        <View>
                            <Text className="font-bold text-xl mb-2 text-red-700">
                                Cons
                            </Text>
                            {topic.options[selectedIndex].cons.map(
                                (con, index) => (
                                    <View key={index} className="mb-1">
                                        <Text className="font-semibold text-base text-gray-800">
                                            {con.participant}
                                        </Text>
                                        <Text className="text-sm text-gray-600">
                                            {con.con}
                                        </Text>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ClosedTopic;

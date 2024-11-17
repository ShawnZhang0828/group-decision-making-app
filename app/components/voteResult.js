import React from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Icon from "react-native-vector-icons/FontAwesome6";

const VoteResult = ({ selectedIndex, setSelectedIndex, topic, maxVoters, finalDecision="" }) => {
    const screenWidth = Dimensions.get("window").width;

    // screen configuration for the bar chart
    const chartConfig = {
        chartYSections: maxVoters + Math.max((maxVoters - 1), 1),
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
                    option.content == finalDecision ? "#177AD5" : "#c0c2c2",
                showTooltip: true,
            };
        })
    );

    return (
        <ScrollView
            className={`h-[73%] ${
                selectedIndex !== null ? "border-b-2 border-gray-500" : ""
            }`}
        >
            <View>
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-lg">Result</Text>
                    {selectedIndex !== null && (
                        <Text className="font-bold flex-row items-center">
                            <Icon name="arrow-right" color="#000000" />
                            {"  "}
                            {topic.options[selectedIndex].content}
                        </Text>
                    )}
                </View>

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
                        {topic.options[selectedIndex].pros.map((pro, index) => (
                            <View key={index} className="mb-1">
                                <Text className="font-semibold text-base text-gray-800">
                                    {pro.participant}
                                </Text>
                                <Text className="text-sm text-gray-600">
                                    {pro.pro}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Cons Section */}
                    <View>
                        <Text className="font-bold text-xl mb-2 text-red-700">
                            Cons
                        </Text>
                        {topic.options[selectedIndex].cons.map((con, index) => (
                            <View key={index} className="mb-1">
                                <Text className="font-semibold text-base text-gray-800">
                                    {con.participant}
                                </Text>
                                <Text className="text-sm text-gray-600">
                                    {con.con}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default VoteResult;

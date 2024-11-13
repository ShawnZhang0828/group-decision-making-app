import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useLocalSearchParams } from "expo-router";

const ClosedProblem = () => {
    const { string_problem } = useLocalSearchParams();
    const problem = JSON.parse(string_problem);

    const screenWidth = Dimensions.get("window").width;
    const maxVoters = problem.options.reduce(
        (max, option) =>
            option.voters.length > max.voters.length ? option : max,
        problem.options[0]
    ).voters.length;

    const getFinalDecisions = () => {
        return problem.options.filter(
            (option) => option.voters.length == maxVoters
        );
    };

    const chartConfig = {
        chartYSections: maxVoters + 1,
        barWidth: 35,
        width: screenWidth * 0.9,
        spacing:
            (screenWidth * 0.75 - problem.options.length * 35) /
            (problem.options.length + 1),
    };

    const chartData = Array.from(
        problem.options.map((option) => {
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
                <Text className="text-lg">{problem.description}</Text>
            </View>

            <ScrollView>
                <View className="mb-6">
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
                            const option = problem.options[index];
                            return (
                                <View
                                    className="bg-gray-200 p-1 rounded"
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        transform: [{ translateY: 65 }],
                                        marginBottom: 4,
                                    }}
                                >
                                    <Text className="text-xs font-bold self-center">
                                        {option.content}
                                    </Text>
                                    {option.voters.map((voter, voterIndex) => (
                                        <View
                                            key={voterIndex}
                                            className="border-b-2 border-gray-500"
                                        >
                                            <Text className="text-xs text-black">
                                                {voter}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            );
                        }}
                    />
                </View>

                <View>
                    <Text className="font-bold text-xl">Final Decision</Text>
                    {getFinalDecisions().map((option, index) => {
                        return (
                            <View className="border-b-2 border-gray-500">
                                <Text key={index} className="text-lg">{index+1}. {option.content}</Text>
                            </View>
                        )
                    })}
                </View>


            </ScrollView>
        </View>
    );
};

export default ClosedProblem;

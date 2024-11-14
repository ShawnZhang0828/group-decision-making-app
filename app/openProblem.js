import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import CommonButton from "./components/commonButton";
import Notification from "./components/notification";

const OpenProblem = () => {
    console.log("Open Problems Page");

    const [selectedID, setSelectedID] = useState(null);
    const [inputEditable, setInputEditable] = useState(false);
    const [rationale, setRationale] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const router = useRouter();

    const { string_problem } = useLocalSearchParams();
    const problem = JSON.parse(string_problem);

    const optionsData = problem.options.map((option) => {
        return {
            id: option.id,
            content: option.content,
        };
    });

    const renderOption = ({ item }) => {
        const isSelected = item.id === selectedID;
        const backgroundColor = isSelected ? "#42a15d" : "#e1e8e3";

        const handleClick = () => {
            setSelectedID(item.id);
            if (!inputEditable) {
                setInputEditable(true);
            }
        };

        return (
            <TouchableOpacity
                className="border-2 border-indigo-950 rounded-lg mb-2 pl-2"
                onPress={handleClick}
                style={{ backgroundColor: backgroundColor }}
            >
                <Text>{item.content}</Text>
            </TouchableOpacity>
        );
    };

    const notificationContent = (
        <View className="flex-row justify-center">
            <TouchableOpacity
                onPress={() => {
                    setShowNotification(false);
                }}
            >
                <Text className="border-2 rounded-md p-2 mr-5">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setShowNotification(false);
                    router.replace("/home");
                }}
            >
                <Text className="border-2 rounded-md p-2">Leave</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="p-4 h-full">
            <View className="mb-4">
                <Text className="font-bold text-xl">Topic</Text>
                <Text className="font-lg">{problem.description}</Text>
            </View>

            <View className="mb-4">
                <Text className="font-bold text-lg mb-3">
                    Select your decision from the options below:{" "}
                </Text>
                <FlatList
                    data={optionsData}
                    renderItem={renderOption}
                    extraData={selectedID}
                    keyExtractor={(option) => option.id.toString()}
                />
            </View>

            <View>
                <Text className="font-bold text-lg mb-3">
                    Decision Insights
                </Text>
                <TextInput
                    placeholder="Please share any insights you have about your decision."
                    multiline={true}
                    value={rationale}
                    editable={inputEditable}
                    onChangeText={(text) => setRationale(text)}
                    onPressIn={() => {
                        if (!inputEditable) {
                            Alert.alert(
                                "Input Disabled",
                                "Please select an option first."
                            );
                        }
                    }}
                    className="border border-gray-400 rounded-lg p-3 mb-4 bg-white"
                />
            </View>

            <CommonButton
                title="Submit"
                onPress={() => {
                    if (selectedID === null) {
                        Alert.alert(
                            "Cannot Submit",
                            "Please select an option first."
                        );
                    } else {
                        setShowNotification(true);
                    }
                }}
            />

            <Notification
                visible={showNotification}
                duration={5000}
                message="Changes successfully saved !"
                children={notificationContent}
                onHide={() => {}}
            />
        </View>
    );
};

export default OpenProblem;

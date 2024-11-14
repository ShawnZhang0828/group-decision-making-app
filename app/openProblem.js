import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useUser } from "./contexts/userContext";
import { UserRole, convertRole } from "./models/userRole";
import CommonButton from "./components/commonButton";
import Notification from "./components/notification";

const OpenProblem = () => {
    console.log("Open Problems Page Rendered");

    const { user } = useUser();

    const [selectedID, setSelectedID] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [activeTab, setActiveTab] = useState("pros");
    const [feedback, setFeedback] = useState({});

    const router = useRouter();

    // accept the problem from route parameters
    const { string_problem } = useLocalSearchParams();
    // reconstruct the problem object
    const problem = JSON.parse(string_problem);

    // get all participants and determine the role
    const participants = Array.from(problem.participants).map((item) => item.participant);
    var role;
    if (participants.includes(user.name)) {
        role = UserRole.PARTICIPANT;
    } else if (user.name === "Patient Giraffe") {
        role = UserRole.STAKEHOLDER;
    } else if (user.name === problem.creator) {
        role = UserRole.CREATOR;
    }

    var completed = false;
    if (role == UserRole.PARTICIPANT) {
        completed = problem.participants.find(
            (participant) => participant.participant === user.name
        ).completed;
    }
    const viewOnly = completed || role == UserRole.CREATOR || role == UserRole.STAKEHOLDER;

    // construct option data for the option list
    const optionsData = problem.options.map((option) => {
        return {
            id: option.id,
            content: option.content,
        };
    });

    // update current feedback based on selected option
    const currentFeedback = feedback[selectedID] || { pros: "", cons: "" };

    // update pros/cons for current selected option
    const updateFeedback = (type, value) => {
        setFeedback((prev) => ({
            ...prev,
            [selectedID]: {
                ...prev[selectedID],
                [type]: value,
            },
        }));
    };

    // render each option component in the FlatList
    const renderOption = ({ item }) => {
        // use a different color for the selected option
        const backgroundColor = item.id === selectedID ? "#42a15d" : "#e1e8e3";

        const handleClick = () => {
            setSelectedID(item.id);
        };

        return (
            <TouchableOpacity className="border-2 border-indigo-950 rounded-lg mb-2" onPress={handleClick}>
                <View className="flex-row items-center justify-between">
                    <View className="w-[87%] pl-2 rounded-md" style={{ backgroundColor: backgroundColor }}>
                        <Text>{item.content}</Text>
                    </View>

                    <View
                        className="flex-row items-center justify-end pr-3"
                        style={{ flex: 1, paddingRight: 3 }}
                    >
                        {feedback[item.id]?.pros && (
                            <Icon name="thumb-up" size={16} color="green" style={{ marginLeft: 5 }} />
                        )}
                        {feedback[item.id]?.cons && (
                            <Icon name="thumb-down" size={16} color="#b5002a" style={{ marginLeft: 5 }} />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    // content within the "Decision Saved Popup"
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
        <KeyboardAvoidingView className="p-4 h-full" behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View className="mb-4">
                <Text className="font-bold text-xl">Topic</Text>
                <Text className="font-lg">{problem.description}</Text>
            </View>

            <View className="flex-row justify-between border-b-2 pb-2 mb-2">
                <View>
                    <Text className="font-bold text-lg">Created by</Text>
                    <Text className="font-lg">{problem.creator}</Text>
                </View>
                <View>
                    <Text className="font-bold text-lg">Viewing as</Text>
                    <Text className="font-lg">{convertRole(role)}</Text>
                </View>
            </View>

            {viewOnly ? (
                <View></View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 30 }}
                    automaticallyAdjustKeyboardInsets={true}
                >
                    <View className="mb-4">
                        <Text className="font-bold text-lg mb-3">
                            Select your decision from the options below{" "}
                        </Text>
                        <FlatList
                            data={optionsData}
                            renderItem={renderOption}
                            extraData={selectedID}
                            keyExtractor={(option) => option.id.toString()}
                            scrollEnabled={false}
                        />
                    </View>

                    {selectedID !== null && (
                        <View>
                            <Text className="font-bold text-lg mb-3">
                                {problem.options[selectedID].content}
                            </Text>
                            <View className="flex-row justify-start mb-2">
                                <TouchableOpacity
                                    onPress={() => setActiveTab("pros")}
                                    className={`p-2 rounded-lg`}
                                    style={{
                                        backgroundColor: activeTab === "pros" ? "#3376b0" : "#e2e8f0",
                                        marginRight: 10,
                                    }}
                                >
                                    <Text className={activeTab === "pros" ? "text-white" : "text-black"}>
                                        Pros
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setActiveTab("cons")}
                                    className={`p-2 rounded-lg`}
                                    style={{
                                        backgroundColor: activeTab === "cons" ? "#3376b0" : "#e2e8f0",
                                    }}
                                >
                                    <Text className={activeTab === "cons" ? "text-white" : "text-black"}>
                                        Cons
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {activeTab === "pros" ? (
                                <TextInput
                                    placeholder="Add pros for this option"
                                    multiline
                                    value={currentFeedback.pros}
                                    onChangeText={(text) => updateFeedback("pros", text)}
                                    className="border border-gray-400 rounded-lg p-3 mb-4 bg-white"
                                    style={{ height: 100 }}
                                />
                            ) : (
                                <TextInput
                                    placeholder="Add cons for this option"
                                    multiline
                                    value={currentFeedback.cons}
                                    onChangeText={(text) => updateFeedback("cons", text)}
                                    className="border border-gray-400 rounded-lg p-3 mb-4 bg-white"
                                    style={{ height: 100 }}
                                />
                            )}
                        </View>
                    )}
                </ScrollView>
            )}

            <CommonButton
                title="Submit"
                onPress={() => {
                    if (selectedID === null) {
                        Alert.alert("Cannot Submit", "Please select an option first.");
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
        </KeyboardAvoidingView>
    );
};

export default OpenProblem;

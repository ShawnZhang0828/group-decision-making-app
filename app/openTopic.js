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
import VoteResult from "./components/voteResult";
import CommonButton from "./components/commonButton";
import Notification from "./components/notification";

const OpenTopic = () => {
    console.log("Open Topics Page Rendered");

    const { user } = useUser();

    // for view only (chart, pros/cons)
    const [selectedIndex, setSelectedIndex] = useState(null);
    // for editing (select an option)
    const [selectedID, setSelectedID] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [activeTab, setActiveTab] = useState("pros");
    const [feedback, setFeedback] = useState({});

    const router = useRouter();

    // accept the topic from route parameters
    const { string_topic } = useLocalSearchParams();
    // reconstruct the topic object
    const topic = JSON.parse(string_topic);

    // get all participants and determine the role
    const participants = Array.from(topic.participants).map(
        (item) => item.participant
    );
    var role;
    if (participants.includes(user.name)) {
        role = UserRole.PARTICIPANT;
    } else if (user.name === "Patient Giraffe") {
        role = UserRole.STAKEHOLDER;
    } else if (user.name === topic.creator) {
        role = UserRole.CREATOR;
    }

    // check if all participants have made a decision
    // if so, the creator can make a final decision
    const numParticipated = topic.participants.filter(
        (participant) => participant.completed
    ).length;
    const allParticipated = numParticipated === participants.length;

    // if the current user is a participant and they have made a decision
    var completed = false;
    if (role == UserRole.PARTICIPANT) {
        completed = topic.participants.find(
            (participant) => participant.participant === user.name
        ).completed;
    }
    const viewOnly =
        completed || role == UserRole.CREATOR || role == UserRole.STAKEHOLDER;

    var selectedOption = null;
    // if completed, get selected option
    if (completed) {
        selectedOption = topic.responses.find(
            (response) => response?.author == user.name
        )?.selectedOption?.content;
    }

    // get the maximum number of votes among all options
    const maxVoters = topic.options.reduce(
        (max, option) =>
            option.voters.length > max.voters.length ? option : max,
        topic.options[0]
    ).voters.length;

    // construct option data for the option list
    const optionsData = topic.options.map((option) => {
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
            <TouchableOpacity
                className="border-2 border-indigo-950 rounded-lg mb-2"
                onPress={handleClick}
            >
                <View className="flex-row items-center justify-between">
                    <View
                        className="w-[87%] pl-2 rounded-md"
                        style={{ backgroundColor: backgroundColor }}
                    >
                        <Text>{item.content}</Text>
                    </View>

                    <View
                        className="flex-row items-center justify-end pr-3"
                        style={{ flex: 1, paddingRight: 3 }}
                    >
                        {feedback[item.id]?.pros && (
                            <Icon
                                name="thumb-up"
                                size={16}
                                color="green"
                                style={{ marginLeft: 5 }}
                            />
                        )}
                        {feedback[item.id]?.cons && (
                            <Icon
                                name="thumb-down"
                                size={16}
                                color="#b5002a"
                                style={{ marginLeft: 5 }}
                            />
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
        <KeyboardAvoidingView
            className="p-4 h-full"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View className="mb-4">
                <Text className="font-bold text-xl">Topic</Text>
                <Text className="font-lg">{topic.description}</Text>
            </View>

            <View className="flex-row justify-between border-b-2 pb-2 mb-2">
                <View>
                    <Text className="font-bold text-lg">Created by</Text>
                    <Text className="font-lg">{topic.creator}</Text>
                </View>
                <View>
                    <Text className="font-bold text-lg">Viewing as</Text>
                    <Text className="font-lg">{convertRole(role)}</Text>
                </View>
            </View>

            {viewOnly ? (
                <View className="h-[78%]">
                    {completed && (
                        <View className="p-2 bg-gray-100 rounded-md shadow mb-4">
                            <Text className="text-lg font-semibold text-gray-800 mb-2 text-center">
                                You have made your decision:
                                <Text className="font-bold text-blue-600">
                                    {" "}
                                    {selectedOption}
                                </Text>
                                .
                            </Text>
                            <Text className="text-sm text-gray-600 text-center">
                                This topic is view-only.
                            </Text>
                        </View>
                    )}
                    {role === UserRole.CREATOR && (
                        <View className="p-2 bg-gray-100 rounded-md shadow mb-4">
                            {allParticipated ? (
                                <View>
                                    <Text
                                        className="text-md
                                        text-gray-800
                                        text-center font-semibold"
                                    >
                                        All participants have made their
                                        decisions.
                                    </Text>
                                    <Text
                                        className="text-md
                                        text-gray-800
                                        mb-2
                                        text-center font-semibold"
                                    >
                                        Please make a final decision.
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {}}
                                        className="bg-blue-500 p-3 rounded-md self-center shadow"
                                    >
                                        <Text className="text-white font-bold text-center">
                                            Decide
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    {/* Creator Information */}
                                    <Text className="text-lg font-bold text-gray-800 text-center mb-1">
                                        You are the creator of this topic.
                                    </Text>

                                    {/* Voting Progress */}
                                    <Text className="text-md font-semibold text-blue-600 text-center mb-2">
                                        Voting Progress: {numParticipated} /{" "}
                                        {participants.length}
                                    </Text>

                                    {/* View-Only Notice */}
                                    <Text className="text-sm text-gray-600 text-center">
                                        This topic is view-only.
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                    <VoteResult
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        topic={topic}
                        maxVoters={maxVoters}
                    />
                </View>
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
                                {topic.options[selectedID].content}
                            </Text>
                            <View className="flex-row justify-start mb-2">
                                <TouchableOpacity
                                    onPress={() => setActiveTab("pros")}
                                    className={`p-2 rounded-lg`}
                                    style={{
                                        backgroundColor:
                                            activeTab === "pros"
                                                ? "#3376b0"
                                                : "#e2e8f0",
                                        marginRight: 10,
                                    }}
                                >
                                    <Text
                                        className={
                                            activeTab === "pros"
                                                ? "text-white"
                                                : "text-black"
                                        }
                                    >
                                        Pros
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setActiveTab("cons")}
                                    className={`p-2 rounded-lg`}
                                    style={{
                                        backgroundColor:
                                            activeTab === "cons"
                                                ? "#3376b0"
                                                : "#e2e8f0",
                                    }}
                                >
                                    <Text
                                        className={
                                            activeTab === "cons"
                                                ? "text-white"
                                                : "text-black"
                                        }
                                    >
                                        Cons
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {activeTab === "pros" ? (
                                <TextInput
                                    placeholder="Add pros for this option"
                                    multiline
                                    value={currentFeedback.pros}
                                    onChangeText={(text) =>
                                        updateFeedback("pros", text)
                                    }
                                    className="border border-gray-400 rounded-lg p-3 mb-4 bg-white"
                                    style={{ height: 100 }}
                                />
                            ) : (
                                <TextInput
                                    placeholder="Add cons for this option"
                                    multiline
                                    value={currentFeedback.cons}
                                    onChangeText={(text) =>
                                        updateFeedback("cons", text)
                                    }
                                    className="border border-gray-400 rounded-lg p-3 mb-4 bg-white"
                                    style={{ height: 100 }}
                                />
                            )}
                        </View>
                    )}
                </ScrollView>
            )}

            {!viewOnly && (
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
            )}

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

export default OpenTopic;

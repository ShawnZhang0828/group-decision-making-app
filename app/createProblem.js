import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";

import CommonButton from "./components/commonButton";
import AddListItem from "./components/addListItem";
import Notification from "./components/notification";

const CreateNewProblemScreen = () => {
    const router = useRouter();

    const [problem, setProblem] = useState("");
    const [participant, setParticipant] = useState("");
    const [stakeholder, setStakeholder] = useState("");
    const [option, setOption] = useState("");
    const [participants, setParticipants] = useState([]);
    const [stakeholders, setStakeholders] = useState([]);
    const [options, setOptions] = useState([]);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const addItemClicked = (item, setItemFunc, list, setListFunc) => {
        if (item) {
            setListFunc([...list, item]);
            setItemFunc("");
        } else {
            Alert.alert("Error", "Please enter a valid name or option.");
        }
    };

    const removeItemClicked = (item, list, setListFunc) => {
        setListFunc(list.filter((i) => i !== item));
    };

    const cancel = () => {
        router.replace("/home");
    };

    // should save problem to the database
    const saveProblem = () => {
        showNotification();
    };

    const showNotification = () => setNotificationVisible(true);
    const hideNotification = () => setNotificationVisible(false);

    const clearInput = () => {
        setProblem("");
        setParticipant("");
        setParticipants([]);
        setStakeholder("");
        setStakeholders([]);
        setOption("");
        setOptions([]);
    };

    const NotificationOptions = (
        <View>
            <View className="flex-row justify-center">
                <TouchableOpacity
                    onPress={() => {
                        clearInput();
                        hideNotification();
                    }}
                >
                    <Text className="border-2 rounded-md p-2 mr-5">
                        Add more
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        hideNotification();
                        router.replace("/home");
                    }}
                >
                    <Text className="border-2 rounded-md p-2">Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            className="flex-1 m-3"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                automaticallyAdjustKeyboardInsets={true}
            >
                <Text className="text-lg font-bold mb-3 mt-5">
                    Describe the Problem
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="Enter the problem description"
                    value={problem}
                    onChange={setProblem}
                    className="border border-gray-400 p-3 rounded-lg mb-5"
                />

                <Text className="text-lg font-bold mb-3">
                    Add a Participant
                </Text>
                <AddListItem
                    placeholder="Enter participant name"
                    input={participant}
                    setInput={setParticipant}
                    list={participants}
                    addItem={() => {
                        addItemClicked(
                            participant,
                            setParticipant,
                            participants,
                            setParticipants
                        );
                    }}
                    removeItem={(item) => {
                        removeItemClicked(item, participants, setParticipants);
                    }}
                />

                <Text className="text-lg font-bold mb-3">
                    Add a Stakeholder
                </Text>
                <AddListItem
                    placeholder="Enter stakeholder name"
                    input={stakeholder}
                    setInput={setStakeholder}
                    list={stakeholders}
                    addItem={() => {
                        addItemClicked(
                            stakeholder,
                            setStakeholder,
                            stakeholders,
                            setStakeholders
                        );
                    }}
                    removeItem={(item) => {
                        removeItemClicked(item, stakeholders, setStakeholders);
                    }}
                />

                <Text className="text-lg font-bold mb-3">Add an Option</Text>
                <AddListItem
                    placeholder="Enter an option"
                    input={option}
                    setInput={setOption}
                    list={options}
                    addItem={() => {
                        addItemClicked(option, setOption, options, setOptions);
                    }}
                    removeItem={(item) => {
                        removeItemClicked(item, options, setOptions);
                    }}
                />
            </ScrollView>

            <CommonButton title="Save" onPress={saveProblem} />
            <Notification
                visible={notificationVisible}
                duration={10000}
                message="Item Saved !"
                children={NotificationOptions}
                onHide={hideNotification}
            />
        </KeyboardAvoidingView>
    );
};

export default CreateNewProblemScreen;

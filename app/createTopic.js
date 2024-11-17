import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";

import CommonButton from "./components/commonButton";
import AddListItem from "./components/addListItem";
import CustomizeModal from "./components/customizeModal";

const CreateNewTopicScreen = () => {
    console.log("Create Topic Page Rendered");

    const router = useRouter();

    const [topic, setTopic] = useState("");
    const [participant, setParticipant] = useState("");
    const [stakeholder, setStakeholder] = useState("");
    const [option, setOption] = useState("");
    const [participants, setParticipants] = useState([]);
    const [stakeholders, setStakeholders] = useState([]);
    const [options, setOptions] = useState([]);
    const [notificationVisible, setNotificationVisible] = useState(false);

    // add a new item to one of participants, stakeholders, or options
    const addItemClicked = (item, setItemFunc, list, setListFunc) => {
        if (item) {
            setListFunc([...list, item]);
            setItemFunc("");
        } else {
            Alert.alert("Error", "Please enter a valid name or option.");
        }
    };

    // remove an item from one of participants, stakeholders, or options
    const removeItemClicked = (item, list, setListFunc) => {
        setListFunc(list.filter((i) => i !== item));
    };

    // should save topic to the database
    const saveTopic = () => {
        setNotificationVisible(true);
    };

    const clearInput = () => {
        setTopic("");
        setParticipant("");
        setParticipants([]);
        setStakeholder("");
        setStakeholders([]);
        setOption("");
        setOptions([]);
    };

    // content within the "Topic Created Popup"
    const NotificationOptions = (
        <View>
            <View className="flex-row justify-center">
                <TouchableOpacity
                    onPress={() => {
                        clearInput();
                        setNotificationVisible(false);
                    }}
                >
                    <Text className="border-2 rounded-md p-2 mr-5">
                        Add more
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setNotificationVisible(false);
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
                    Describe the Topic
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="Enter the topic description"
                    value={topic}
                    onChange={setTopic}
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

            <CommonButton title="Save" onPress={saveTopic} />
            <CustomizeModal
                visible={notificationVisible}
                duration={10000}
                message="Item Saved !"
                children={NotificationOptions}
                onHide={() => setNotificationVisible(false)}
            />
        </KeyboardAvoidingView>
    );
};

export default CreateNewTopicScreen;

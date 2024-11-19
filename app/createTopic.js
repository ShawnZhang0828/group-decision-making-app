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
import DateTimePicker from "@react-native-community/datetimepicker";
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

    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleTimeChange = (event, selectedDate) => {
        if (event.type === "set") {
            // 'set' means the user selected a time
            const currentTime = selectedDate || new Date();
            setSelectedTime(currentTime);
        }
        setShowTimePicker(false); // Hide the picker after selecting
    };

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
        if (!topic) {
            Alert.alert("Error", "Please describe the topic.");
        } else if (participants.length == 0) {
            Alert.alert("Error", "Please add at least one participant.");
        } else if (options.length == 0) {
            Alert.alert("Error", "Please add at least one option.");
        } else {
            setNotificationVisible(true);
        }
    };

    // content within the "Topic Created Popup"
    const notificationOptions = (
        <View>
            <View className="flex-row justify-center">
                <TouchableOpacity
                    onPress={() => {
                        setNotificationVisible(false);
                        router.replace("/home");
                    }}
                >
                    <Text className="border-2 rounded-md p-2 mr-5 bg-red-300">
                        Leave
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setNotificationVisible(false);
                    }}
                >
                    <Text className="border-2 rounded-md p-2 bg-green-200">
                        Edit
                    </Text>
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
                    multiline
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

                <Text className="text-lg font-bold mb-3">
                    Select a Due Date
                </Text>
                <DateTimePicker
                    visible={showTimePicker}
                    value={selectedTime}
                    mode="date"
                    is24Hour={false}
                    display="default"
                    onChange={handleTimeChange}
                />
            </ScrollView>

            <CommonButton title="Save" onPress={saveTopic} />
            <CustomizeModal
                visible={notificationVisible}
                duration={10000}
                message="Item Saved !"
                children={notificationOptions}
                onHide={() => setNotificationVisible(false)}
            />
        </KeyboardAvoidingView>
    );
};

export default CreateNewTopicScreen;

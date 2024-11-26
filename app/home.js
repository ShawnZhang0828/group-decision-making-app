import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import Collapsible from "react-native-collapsible";

import { useUser } from "./contexts/userContext";
import generateTopics from "./utils/topicGenerator";
import TopicItem from "./components/topicItem";
import CommonButton from "./components/commonButton";

const HomeScreen = () => {
    console.log("Home Page Rendered");

    const windowHeight = Dimensions.get("window").height;

    const router = useRouter();
    const { user, logout } = useUser();

    const [showOpenTopics, setShowOpenTopics] = useState(false);
    const [showClosedTopics, setShowClosedTopics] = useState(false);

    // generate the placeholder topics
    var [openTopics, closedTopics] = generateTopics();

    const logoutClicked = () => {
        logout();
        router.replace("/login");
    };

    const createNewTopic = () => {
        router.push("/createTopic");
    };

    const closedTopicsHeight = showOpenTopics ? windowHeight * 0.26 : windowHeight * 0.5;

    return (
        <View className="p-4 h-full">
            <View className="flex-row justify-between items-center mb-7">
                <Text className="text-2xl font-bold">
                    Welcome, {user?.name} !
                </Text>
                <TouchableOpacity onPress={createNewTopic}>
                    <Image
                        source={require("../assets/more.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <View className="h-[80%]">
                <TouchableOpacity
                    onPress={() => {
                        setShowOpenTopics(!showOpenTopics);
                    }}
                    className="bg-blue-500 p-4 rounded-lg mb-2 flex-row justify-between items-center pr-5"
                >
                    <Text className="text-white text-lg font-bold">
                        Open Topics
                    </Text>
                    {showOpenTopics ? (
                        <Icon name="down" size={16} color="white" />
                    ) : (
                        <Icon name="right" size={16} color="white" />
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={!showOpenTopics}>
                    <View
                        style={{
                            maxHeight: windowHeight * 0.3,
                            overflow: "hidden",
                        }}
                    >
                        <FlatList
                            data={openTopics}
                            renderItem={({ item }) => (
                                <TopicItem topic={item} />
                            )}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ padding: 8 }}
                        />
                    </View>
                </Collapsible>

                <TouchableOpacity
                    onPress={() => {
                        setShowClosedTopics(!showClosedTopics);
                    }}
                    className="bg-blue-500 p-4 rounded-lg mb-2  flex-row justify-between items-center pr-5"
                >
                    <Text className="text-white text-lg font-bold">
                        Closed Topics
                    </Text>
                    {showClosedTopics ? (
                        <Icon name="down" size={16} color="white" />
                    ) : (
                        <Icon name="right" size={16} color="white" />
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={!showClosedTopics}>
                    <View
                        style={{
                            maxHeight: closedTopicsHeight,
                            overflow: "hidden",
                        }}
                    >
                        <FlatList
                            data={closedTopics}
                            renderItem={({ item }) => (
                                <TopicItem topic={item} />
                            )}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ padding: 8 }}
                        />
                    </View>
                </Collapsible>
            </View>

            <CommonButton title="Logout" onPress={logoutClicked} />
        </View>
    );
};

export default HomeScreen;

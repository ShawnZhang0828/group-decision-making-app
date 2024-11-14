import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Collapsible from "react-native-collapsible";

import { useUser } from "./contexts/userContext";
import generateProblems from "./utils/problemGenerator";
import ProblemItem from "./components/problemItem";
import CommonButton from "./components/commonButton";

const HomeScreen = () => {
    const windowHeight = Dimensions.get("window").height;

    const { name } = useLocalSearchParams();
    const router = useRouter();
    const { user, logout } = useUser();

    const [showOpenProblems, setShowOpenProblems] = useState(false);
    const [showClosedProblems, setShowClosedProblems] = useState(false);

    var [openProblems, closedProblems] = generateProblems(name);

    const logoutClicked = () => {
        logout();
        router.replace("/login");
    };

    const createNewProblem = () => {
        router.push("/createProblem");
    };

    return (
        <View className="p-4 h-full">
            <View className="flex-row justify-between items-center mb-7">
                <Text className="text-2xl font-bold">
                    Welcome, {user?.name}!
                </Text>
                <TouchableOpacity onPress={createNewProblem}>
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
                        setShowOpenProblems(!showOpenProblems);
                    }}
                    className="bg-blue-500 p-4 rounded-lg mb-2"
                >
                    <Text className="text-white text-lg font-bold">
                        Open Problems
                    </Text>
                </TouchableOpacity>
                <Collapsible collapsed={!showOpenProblems}>
                    <View
                        style={{
                            maxHeight: windowHeight * 0.3,
                            overflow: "hidden",
                        }}
                    >
                        <FlatList
                            data={openProblems}
                            renderItem={({ item }) => (
                                <ProblemItem problem={item} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ padding: 8 }}
                        />
                    </View>
                </Collapsible>

                <TouchableOpacity
                    onPress={() => {
                        setShowClosedProblems(!showClosedProblems);
                    }}
                    className="bg-blue-500 p-4 rounded-lg mb-2"
                >
                    <Text className="text-white text-lg font-bold">
                        Closed Problems
                    </Text>
                </TouchableOpacity>
                <Collapsible collapsed={!showClosedProblems}>
                    <View
                        style={{
                            maxHeight: windowHeight * 0.26,
                            overflow: "hidden",
                        }}
                    >
                        <FlatList
                            data={closedProblems}
                            renderItem={({ item }) => (
                                <ProblemItem problem={item} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
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

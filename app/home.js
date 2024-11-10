import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useUser } from "./contexts/userContext";
import generateProblems from './utils/problemGenerator'  
import Collapsible from "react-native-collapsible";
import ProblemItem from "./components/problemItem";

const HomeScreen = () => {
    const { name } = useLocalSearchParams();
    const router = useRouter();
    const { user, logout } = useUser();

    const [showOpenProblems, setShowOpenProblems] = useState(false);
    const [showClosedProblems, setShowClosedProblems] = useState(false);

    var [openProblems, closedProblems]  = generateProblems(name);

    const logoutClicked = () => {
        logout();
        router.replace("/login");
    };

    const createNewProblem = () => {
        router.push('/createProblem');
    }

    return (
        <ScrollView className="p-4 bg-white">
            <View className="flex-row justify-between items-center mb-7">
                <Text className="text-2xl font-bold">Welcome, {user?.name}!</Text>
                <TouchableOpacity onPress={createNewProblem}>
                    <Image 
                        source={require('../assets/more.png')}
                        style={{ width: 30, height: 30 }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
            

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
                <View className="p-2 border-spacing-3">
                    {openProblems.map((problem, index) => {
                        return <ProblemItem problem={problem} key={index} />;
                    })}
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
                <View className="p-2">
                    {closedProblems.map((problem, index) => {
                        return <ProblemItem problem={problem} key={index} />;
                    })}
                </View>
            </Collapsible>

            <Button title="Logout" onPress={logoutClicked} />
        </ScrollView>
    );
};

export default HomeScreen;

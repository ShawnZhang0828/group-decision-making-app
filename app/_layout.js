import { Stack } from "expo-router";
import { UserProvider } from "./contexts/userContext";

import "./global.css";

const Layout = () => {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="home" options={{ title: "Home" }} />
                <Stack.Screen name="login" options={{ title: "Log In" }} />
                <Stack.Screen
                    name="createTopic"
                    options={{ title: "Create New Topic" }}
                />
                <Stack.Screen
                    name="openTopic"
                    options={{ title: "Topic" }}
                />
                <Stack.Screen
                    name="closedTopic"
                    options={{ title: "Topic Closed" }}
                />
            </Stack>
        </UserProvider>
    );
};

export default Layout;

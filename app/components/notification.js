import React, { useState, useEffect } from "react";
import { Text, Animated } from "react-native";

const Notification = ({ visible, duration, message, children, onHide }) => {
    const [slideAnimation] = useState(new Animated.Value(150));

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
    
            const timer = setTimeout(() => {
                Animated.timing(slideAnimation, {
                    toValue: 150,
                    duration: 300,
                    useNativeDriver: true
                }).start(() => {
                    onHide();
                });
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={{
                transform: [{ translateY: slideAnimation }]
            }}
            className="absolute self-center bottom-8 bg-indigo-200 p-4 rounded-lg max-w-[90%] w-auto"
        >
            <Text className="text-blue-950 text-center mb-2 font-bold text-lg">{message}</Text>
            {children}
        </Animated.View>
    );
}

export default Notification;
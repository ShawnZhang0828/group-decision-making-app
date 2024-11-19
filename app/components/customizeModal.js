import React, { useState, useEffect } from "react";
import { View, Text, Animated, Modal } from "react-native";

const CustomizeModal = ({ visible, duration, message, children, onHide }) => {
    const [slideAnimation] = useState(new Animated.Value(150));

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(slideAnimation, {
                    toValue: 150,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    onHide();
                });
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View className="bg-slate-400/80 flex-1 justify-center items-center">
                <View className="bg-indigo-100 py-6 px-6 rounded-lg w-fit items-center max-w-[95%]">
                    <Text className="text-blue-950 text-center mb-4 font-bold text-lg">
                        {message}
                    </Text>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default CustomizeModal;

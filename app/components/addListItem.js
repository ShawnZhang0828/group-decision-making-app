import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    VirtualizedList,
} from "react-native";

const AddListItem = ({
    placeholder,
    input,
    setInput,
    list,
    addItem,
    removeItem,
}) => {
    return (
        <View className="items-center mb-3">
            <View className="flex-row items-center mb-3">
                <TextInput
                    placeholder={placeholder}
                    value={input}
                    onChangeText={setInput}
                    className="flex-1 border border-gray-400 p-3 rounded-lg mr-2"
                />
                <TouchableOpacity onPress={addItem}>
                    <Image
                        className="flex-row w-5 h-5"
                        source={require("../../assets/add.png")}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                scrollEnabled={false}
                className="self-start min-w-[50%] ml-4"
                data={list}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View className="flex-row justify-between items-center mb-2 px-3 py-1 border-2 border-gray-800 rounded-md">
                            <Text className="mr-3">{item}</Text>
                            <TouchableOpacity onPress={() => removeItem(item)}>
                                <Image
                                    className="flex-row w-5 h-5"
                                    source={require("../../assets/remove.png")}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default AddListItem;

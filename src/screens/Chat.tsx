import { useState, useContext, useEffect } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableHighlight, TouchableWithoutFeedback, TextInput, TouchableNativeFeedback, Button, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ThemeContext from "../context/ThemeContext";

import Input from "../components/Input";
import MessageList from "../layout/MessageList";

import { shadows, componentStyles, ResponsiveUtils } from "../util/designSystem"


export default function Chat() {

    const { theme } = useContext(ThemeContext)!;

    const [message, setMessage] = useState('');

    function handleSubmitMessage() {
        console.log(message);
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <MessageList />
                </TouchableWithoutFeedback>

                <View
                    style={[styles.inputContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.borderStrong }]}
                >
                    <Input setMessage={setMessage} />
                    <TouchableHighlight style={{
                        borderWidth: 1,
                        borderRadius: theme.borderRadius.full,
                        padding: ResponsiveUtils.scale(6),
                        marginRight: ResponsiveUtils.scale(8),
                    }}>
                        <MaterialIcons name="multitrack-audio" size={ResponsiveUtils.scale(24)} color={theme.colors.textPrimary} />
                    </TouchableHighlight>
                    <View
                        style={{
                            backgroundColor: theme.colors.secondary,
                            padding: ResponsiveUtils.scale(8),
                            borderRadius: theme.borderRadius.full,
                        }}
                    >
                        <TouchableNativeFeedback style={{
                            backgroundColor: theme.colors.accent
                        }}>
                            <MaterialIcons name="send" size={ResponsiveUtils.scale(24)} color={'white'} />
                        </TouchableNativeFeedback>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        position: 'static',
        borderWidth: 0,
        borderTopWidth: 1,
        paddingVertical: ResponsiveUtils.scale(4),
        paddingHorizontal: ResponsiveUtils.scale(4),
        flexDirection: 'row',
        alignItems: 'center',

    }
})


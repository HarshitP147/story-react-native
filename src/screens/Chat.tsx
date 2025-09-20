import { useState, useContext } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableHighlight, TouchableWithoutFeedback, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ThemeContext from "../context/ThemeContext";

import Input from "../components/Input";
import MessageList from "../layout/MessageList";

import { shadows, componentStyles, ResponsiveUtils } from "../util/designSystem"

export default function Chat() {

    const { theme } = useContext(ThemeContext)!;

    const [message, setMessage] = useState('');

    console.log(message)


    return (
        <SafeAreaView
            style={[styles.container, {
                backgroundColor: theme.colors.background
            }]}
        >
            <MessageList />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{
                        marginBottom: theme.spacing['lg'],
                        flexDirection: 'row',
                        paddingHorizontal: 27,
                        alignItems: 'center',
                    }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                            <Input
                                setMessage={setMessage}
                            />
                            <TouchableHighlight
                                style={[
                                    componentStyles.button.primary(theme),
                                    {
                                        // borderStartStartRadius: 0,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        paddingVertical: ResponsiveUtils.scale(12),
                                        ...shadows.lg
                                    }
                                ]}
                                onPress={() => {
                                    // Handle submit logic here
                                    console.log('Submit message:', message);
                                }}
                                underlayColor={theme.colors.primaryDark}
                            >
                                <MaterialIcons name="send" size={24} color="white" />
                            </TouchableHighlight>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    submitButton: {
        borderStartStartRadius: 0,
    }
})


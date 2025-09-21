import { useContext, useEffect } from 'react'
import { StyleSheet, Keyboard, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, useAnimatedValue } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useSharedValue, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated'

import ThemeContext from '../context/ThemeContext'

import MessageList from '../layout/MessageList'
import InputBox from '../components/InputBox'

import { ResponsiveUtils } from '../util/designSystem'

export default function Chat() {
    const { theme } = useContext(ThemeContext)!;


    const keyboard = useAnimatedKeyboard();

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: -keyboard.height.value
                }
            ]
        }
    });

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TouchableWithoutFeedback style={[styles.messageContainer, { backgroundColor: theme.colors.background }]} onPress={Keyboard.dismiss}>
                <MessageList />
            </TouchableWithoutFeedback>
            <Animated.View style={animatedStyles}>
                <InputBox />
            </Animated.View>

        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'contents',

    },
    messageContainer: {
        flex: 1,
    },
    keyboardAvoidingContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
})
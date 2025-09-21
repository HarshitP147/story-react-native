import { useContext } from 'react'
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated'

import ThemeContext from '../context/ThemeContext'

import MessageList from '../layout/MessageList'
import InputBox from '../components/InputBox'


export default function Chat() {
    const { theme } = useContext(ThemeContext)!;

    const keyboard = useAnimatedKeyboard();

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{
            translateY: -keyboard.height.value
        }]
    }));

    return (
        <SafeAreaView style={{ display: 'contents' }}>
            <TouchableWithoutFeedback style={[{ backgroundColor: theme.colors.background }]} onPress={Keyboard.dismiss}>
                <MessageList />
            </TouchableWithoutFeedback>
            <Animated.View style={animatedStyles}>
                <InputBox />
            </Animated.View>
        </SafeAreaView >
    )
}
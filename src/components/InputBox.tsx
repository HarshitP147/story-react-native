import { useState, useContext } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, TouchableNativeFeedback, TouchableHighlight, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import ThemeContext from '../context/ThemeContext'

import Input from '../components/Input'

import { ResponsiveUtils } from '../util/designSystem'


export default function InputBox() {
    const { theme } = useContext(ThemeContext)!;

    const [message, setMessage] = useState('')

    function handleSend() {
        console.log(message);
    }

    return (
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }]}>
            <TouchableHighlight style={{
                borderWidth: 1,
                borderRadius: theme.borderRadius.full,
                padding: ResponsiveUtils.scale(8),
                backgroundColor: theme.colors.surface,
            }}>
                <MaterialIcons name="multitrack-audio" size={ResponsiveUtils.scale(28)} color={theme.colors.textPrimary} />
            </TouchableHighlight>
            <Input setMessage={setMessage} />
            <View
                style={{
                    backgroundColor: theme.colors.primary,
                    padding: ResponsiveUtils.scale(8),
                    borderRadius: theme.borderRadius.full,
                }}
            >
                <TouchableNativeFeedback style={{
                    backgroundColor: theme.colors.secondary,
                }}
                    onPress={handleSend}
                >
                    <MaterialIcons name="send" size={ResponsiveUtils.scale(28)} color={'white'} />
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsiveUtils.scale(6),
        paddingHorizontal: ResponsiveUtils.scale(16),
        paddingTop: ResponsiveUtils.scale(12),
        paddingBottom: ResponsiveUtils.scale(24),
    }
});
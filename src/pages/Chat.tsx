import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import MessageList from '../layout/MessageList';

import { componentStyles, shadows, responsiveUtils } from '../util/designSystem'

import { type Theme } from '../util/types';
import Input from '../components/small/Input';



export default function Chat({ theme }: { theme: Theme }) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() !== '') {
            console.log('Sent message:', input);
            setInput('');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : responsiveUtils.scale(20)}
            >
                <View style={styles.chatContainer}>
                    <MessageList />
                    <BlurView intensity={100} style={[styles.inputRow, {
                        // backgroundColor: theme.colors.surface + (theme.isDark ? '20' : 'F2'),
                        borderTopColor: theme.colors.border
                    }]}>
                        <Input setMessage={setInput} placeHolder={"Is this working?"} />
                        <TouchableOpacity onPress={handleSend} style={[componentStyles.button.primary(theme), styles.sendButton]}>
                            <Text style={[componentStyles.text.body(theme), { color: theme.colors.textInverse, fontWeight: '600' }]}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </BlurView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        position: 'relative',
    },
    inputRow: {
        position: 'absolute',
        bottom: responsiveUtils.scale(16), // Responsive positioning
        left: responsiveUtils.scale(16),
        right: responsiveUtils.scale(16),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveUtils.scale(16),
        paddingVertical: responsiveUtils.scale(12),
        borderTopWidth: 1,
        borderRadius: responsiveUtils.scale(20), // Rounded corners for floating effect
        backgroundColor: 'transparent',
        ...shadows.lg, // Stronger shadow for better floating effect
    },
    sendButton: {
        minWidth: responsiveUtils.scale(60),
    },
})
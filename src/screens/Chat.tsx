import { useState, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ThemeContext from '../context/ThemeContext';

import MessageList from '../layout/MessageList';

import { shadows, ResponsiveUtils } from '../../designSystem'



export default function Chat() {
    const [input, setInput] = useState('');

    const { theme, toggleTheme } = useContext(ThemeContext)!;

    const handleSend = () => {
        if (input.trim() !== '') {
            console.log('Sent message:', input);
            setInput('');
        }
        toggleTheme();

    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : ResponsiveUtils.scale(20)}
            >
                <View style={styles.chatContainer}>
                    <MessageList />
                </View>

            </KeyboardAvoidingView>
        </View>
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
        bottom: ResponsiveUtils.scale(16), // Responsive positioning
        left: ResponsiveUtils.scale(16),
        right: ResponsiveUtils.scale(16),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsiveUtils.scale(16),
        paddingVertical: ResponsiveUtils.scale(12),
        borderTopWidth: 1,
        borderRadius: ResponsiveUtils.scale(20), // Rounded corners for floating effect
        backgroundColor: 'transparent',
        ...shadows.lg, // Stronger shadow for better floating effect
    },
    input: {
        flex: 1,
        marginRight: ResponsiveUtils.scale(12),
    },
    sendButton: {
        minWidth: ResponsiveUtils.scale(60),
    },
})
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { componentStyles, Theme, shadows, ResponsiveUtils } from '../designSystem'
import { BlurView } from 'expo-blur';

// A long list fake
const messages = Array.from({ length: 100 }, (_, i) => `Message ${i + 1}`);

import React, { useState } from 'react';

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
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : ResponsiveUtils.scale(20)}
            >
                <View style={styles.chatContainer}>
                    <FlatList
                        data={messages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={[componentStyles.card(theme), styles.messageContainer]}>
                                <Text style={componentStyles.text.body(theme)}>
                                    {item}
                                </Text>
                            </View>
                        )}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                    <BlurView intensity={100} style={[styles.inputRow, {
                        // backgroundColor: theme.colors.surface + (theme.isDark ? '20' : 'F2'),
                        borderTopColor: theme.colors.border
                    }]}>
                        <TextInput
                            placeholder='Type your message...'
                            placeholderTextColor={theme.colors.textTertiary}
                            style={[componentStyles.input(theme), styles.input]}
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            multiline={false}
                            // blurOnSubmit={true}
                        />
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
    listContainer: {
        padding: ResponsiveUtils.scale(16),
        paddingBottom: ResponsiveUtils.scale(120), // Responsive bottom padding
    },
    messageContainer: {
        marginBottom: ResponsiveUtils.scale(8),
        // Remove padding since ComponentStyles.card already provides it
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
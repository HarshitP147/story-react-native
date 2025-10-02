import { ElevenLabsProvider, useConversation } from '@elevenlabs/react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

function ConversationScreen() {
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(false);

    const conversation = useConversation({
        onConnect: () => {
            console.log('Connected to conversation');
            setIsConnected(true);
        },
        onDisconnect: () => {
            console.log('Disconnected from conversation');
            setIsConnected(false);
        },
        onMessage: (message) => {
            console.log('Message received:', message);
        },
        onError: (error) => {
            console.error('Conversation error:', error);
        },
    });

    const startConversation = async () => {
        try {
            await conversation.startSession({
                agentId: 'agent_7701k6h6njz3eb4sz4m2ehyq20dx',
            });
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    };

    const endConversation = async () => {
        try {
            await conversation.endSession();
        } catch (error) {
            console.error('Failed to end conversation:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title='Go to chats' onPress={() => navigation.navigate('Main') as never} />

            <Text style={styles.status}>Status: {conversation.status}</Text>


            <Text style={styles.speaking}>
                Agent is {conversation.isSpeaking ? 'speaking' : 'not speaking'}
            </Text>

            <TouchableOpacity
                style={[styles.button, isConnected && styles.buttonActive]}
                onPress={isConnected ? endConversation : startConversation}
            >
                <Text style={styles.buttonText}>
                    {isConnected ? 'End Conversation' : 'Start Conversation'}
                </Text>
            </TouchableOpacity>

            {conversation.canSendFeedback && (
                <View style={styles.feedbackContainer}>
                    <TouchableOpacity
                        style={styles.feedbackButton}
                        onPress={() => conversation.sendFeedback(true)}
                    >
                        <Text>👍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.feedbackButton}
                        onPress={() => conversation.sendFeedback(false)}
                    >
                        <Text>👎</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

function App() {
    return (
        <ElevenLabsProvider>
            <ConversationScreen />
        </ElevenLabsProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    status: {
        fontSize: 16,
        marginBottom: 10,
    },
    speaking: {
        fontSize: 14,
        marginBottom: 20,
        color: '#666',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonActive: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    feedbackContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    feedbackButton: {
        backgroundColor: '#F2F2F7',
        padding: 10,
        borderRadius: 8,
    },
});

export default App;

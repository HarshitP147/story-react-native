import { useContext, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';

import ThemeContext from '../context/ThemeContext';

import { componentStyles, ResponsiveUtils, shadows } from '../util/designSystem'

// A long list fake
const messages = Array.from({ length: 100 }, (_, i) => `Message ${i + 1}`);


export default function MessageList() {
    const { theme } = useContext(ThemeContext)!;
    const flatListRef = useRef<FlatList>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const buttonOpacity = useSharedValue(0);
    const buttonScale = useSharedValue(0.8);

    const handleScroll = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;

        if (!isNearBottom && !showScrollButton) {
            setShowScrollButton(true);
            buttonOpacity.value = withTiming(1, { duration: 300 });
            buttonScale.value = withSpring(1, { damping: 15, stiffness: 200 });
        } else if (isNearBottom && showScrollButton) {
            buttonOpacity.value = withTiming(0, { duration: 300 });
            buttonScale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
            // Delay hiding the button to allow animation to complete
            setTimeout(() => setShowScrollButton(false), 300);
        }
    };

    const scrollToBottom = () => {
        // Add a subtle press animation
        buttonScale.value = withSpring(0.9, { damping: 10, stiffness: 400 });
        setTimeout(() => {
            buttonScale.value = withSpring(1, { damping: 15, stiffness: 200 });
        }, 100);

        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const animatedButtonStyle = useAnimatedStyle(() => ({
        opacity: buttonOpacity.value,
        transform: [{ scale: buttonScale.value }],
    }));

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    const number = parseInt(item.split(' ')[1]);
                    // Alternate message background colors
                    const backgroundColor = number % 2 === 0 ? theme.colors.secondaryLight : theme.colors.primaryLight;
                    return (
                        <View style={[componentStyles.card(theme), styles.messageContainer, { backgroundColor }]}>
                            <Text style={componentStyles.text.body(theme)}>
                                {item}
                            </Text>
                        </View>
                    );
                }}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: theme.colors.background }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />

            {showScrollButton && (
                <Animated.View style={[
                    styles.scrollButtonContainer,
                    animatedButtonStyle
                ]}>
                    <TouchableOpacity
                        style={[
                            styles.scrollButton,
                            {
                                backgroundColor: theme.colors.primary,
                                ...shadows.lg
                            }
                        ]}
                        onPress={scrollToBottom}
                        activeOpacity={0.8}
                    >
                        <Entypo
                            name="chevron-down"
                            size={ResponsiveUtils.scale(28)}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    messageContainer: {
        marginBottom: ResponsiveUtils.scale(12),
    },
    listContainer: {
        padding: ResponsiveUtils.scale(16),
        paddingBottom: ResponsiveUtils.scale(12), // Responsive bottom padding
    },
    scrollButtonContainer: {
        position: 'absolute',
        bottom: ResponsiveUtils.scale(12), // Position above the input box
        left: 0,
        right: 0,
        alignItems: 'center', // Center horizontally
        zIndex: 1000,
    },
    scrollButton: {
        width: ResponsiveUtils.scale(40),
        height: ResponsiveUtils.scale(40),
        borderRadius: ResponsiveUtils.scale(28),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        // Add a subtle border for better definition
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
})
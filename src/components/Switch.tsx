// ReanimatedSwitch.tsx - Using React Native Reanimated 3
import { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
    runOnJS,
} from 'react-native-reanimated';

import type { SwitchProps } from '../util/types';

export const Switch: React.FC<SwitchProps> = ({
    value,
    onValueChange,
    theme,
    size = 'medium',
    disabled = false,
}) => {
    // Shared value for animation
    const switchValue = useSharedValue(value ? 1 : 0);

    // Update animation when value changes
    useEffect(() => {
        switchValue.value = withSpring(value ? 1 : 0);
    }, [value, switchValue]);

    // Get size dimensions
    const getSizes = () => {
        switch (size) {
            case 'small':
                return {
                    width: 40,
                    height: 24,
                    thumbSize: 18,
                    padding: 2
                };
            case 'large':
                return {
                    width: 60,
                    height: 36,
                    thumbSize: 28,
                    padding: 3
                };
            default:
                return {
                    width: 50,
                    height: 30,
                    thumbSize: 22,
                    padding: 2
                };
        }
    };

    const { width, height, thumbSize, padding } = getSizes();

    // Animated style for the track (background)
    const trackAnimatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            switchValue.value,
            [0, 1],
            [theme.colors.border, theme.colors.primary]
        );

        return {
            backgroundColor,
        };
    });

    // Animated style for the thumb (circle)
    const thumbAnimatedStyle = useAnimatedStyle(() => {
        const translateX = switchValue.value * (width - thumbSize - padding * 2);

        return {
            transform: [{ translateX }],
        };
    });

    // Handle press with haptic feedback
    const handlePress = () => {
        if (disabled) return;

        // Toggle the value
        const newValue = !value;

        // Update animation immediately for responsiveness
        switchValue.value = withSpring(newValue ? 1 : 0);

        // Call the callback
        runOnJS(onValueChange)(newValue);
    };

    const styles = StyleSheet.create({
        container: {
            width,
            height,
            borderRadius: height / 2,
            justifyContent: 'center',
            paddingHorizontal: padding,
            opacity: disabled ? 0.5 : 1,
        },
        thumb: {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: theme.colors.surface,
            // Neuromorphic shadow effect
            shadowColor: theme.isDark ? theme.colors.shadowLight : theme.colors.shadowDark,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.isDark ? 0.3 : 0.15,
            shadowRadius: 4,
            elevation: 4,
            // Add subtle border for better definition
            borderWidth: theme.isDark ? 0.5 : 0,
            borderColor: theme.colors.border,
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            disabled={disabled}
            accessibilityRole="switch"
            accessibilityState={{ checked: value }}
        >
            <Animated.View style={[styles.container, trackAnimatedStyle]}>
                <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
            </Animated.View>
        </TouchableOpacity>
    );
};

// Export both versions
export default Switch;
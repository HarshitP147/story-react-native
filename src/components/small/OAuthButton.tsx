import { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

import ThemeContext from '../../context/ThemeContext'

import { borderRadius, responsiveUtils, shadows, spacing, typography } from "../../util/designSystem"

import type { OAuthButtonProps } from '../../util/types';
import supabase from '../../api/supabase';


export default function OAuthButton(props: OAuthButtonProps) {
    const [isPressed, setPressed] = useState(false);

    const { theme } = useContext(ThemeContext)!;

    const textColor = theme.isDark ? theme.colors.textPrimary : theme.colors.textInverse;
    const isDisabled = props.loading;

    const handlePress = async () => {
        if (props.onPress) {
            await props.onPress();
        }
    };

    return (
        <TouchableHighlight
            onPressIn={() => !isDisabled && setPressed(true)}
            onPressOut={() => !isDisabled && setPressed(false)}
            onPress={handlePress}
            disabled={isDisabled}
        >
            <View style={[
                styles.oAuthContainer,
                {
                    borderRadius: borderRadius.md,
                    backgroundColor: isPressed ? theme.colors.primaryLight : theme.colors.primary,
                    opacity: props.loading ? 0.6 : 1,
                }
            ]}>
                {props.loading ? (
                    <ActivityIndicator
                        size={responsiveUtils.scale(24)}
                        color={textColor}
                    />
                ) : (
                    <AntDesign name={props.auth} size={responsiveUtils.scale(24)} color={textColor} />
                )}
                <Text style={{ color: textColor, fontSize: typography.fontSize['base'] }}>
                    {props.loading
                        ? `${props.type === "login" ? "Logging in" : "Signing up"}...`
                        : `${props.type === "login" ? "Login" : "Signup"} with ${props.auth.charAt(0).toUpperCase() + props.auth.slice(1)}`
                    }
                </Text>
            </View>
        </TouchableHighlight>

    )
}

const styles = StyleSheet.create({
    oAuthContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderRadius.md,
        gap: spacing.lg,
        paddingVertical: spacing['md'],
        elevation: 3,
    }
});
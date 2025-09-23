import { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

import ThemeContext from '../../context/ThemeContext'

import { borderRadius, responsiveUtils, shadows, spacing, typography } from "../../util/designSystem"

import type { OAuthButtonProps } from '../../util/types';


export default function OAuthButton(props: OAuthButtonProps) {
    const [isPressed, setPressed] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const { theme } = useContext(ThemeContext)!;

    const textColor = theme.isDark ? theme.colors.textPrimary : theme.colors.textInverse;
    // const isDisabled = props.loading;

    function handlePress() {
        setIsLoading(true);
        // Handle OAuth login/signup logic here

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return (
        <TouchableHighlight
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={handlePress}
        >
            <View style={[
                styles.oAuthContainer,
                {
                    borderRadius: borderRadius.md,
                    backgroundColor: isPressed ? theme.colors.primaryLight : theme.colors.primary,
                    opacity: loading ? 0.6 : 1,
                }
            ]}>
                {loading ? (
                    <ActivityIndicator
                        size={responsiveUtils.scale(24)}
                        color={textColor}
                    />
                ) : (
                    <AntDesign name={props.auth} size={responsiveUtils.scale(24)} color={textColor} />
                )}
                <Text style={{ color: textColor, fontSize: typography.fontSize['base'] }}>
                    {loading
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
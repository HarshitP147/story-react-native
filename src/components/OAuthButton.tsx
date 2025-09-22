import { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

import ThemeContext from '../context/ThemeContext'

import { borderRadius, responsiveUtils, spacing } from "../util/designSystem"

import type { OAuthButtonProps } from '../util/types';


export default function OAuthButton(props: OAuthButtonProps) {
    const [isPressed, setPressed] = useState(false);

    const { theme } = useContext(ThemeContext)!;

    const textColor = theme.isDark ? theme.colors.textPrimary : theme.colors.textInverse;

    return (
        <TouchableHighlight onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} >
            <View style={[styles.oAuthContainer, { borderRadius: borderRadius.md, backgroundColor: isPressed ? theme.colors.primaryLight : theme.colors.primary }]}>
                <AntDesign name={props.auth} size={24} color={textColor} />
                <Text style={{ color: textColor }}>
                    {props.type === "login" ? "Login" : "Signup"} with {props.auth.charAt(0).toUpperCase() + props.auth.slice(1)}
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
        // width: responsiveUtils.wp(100),
        // alignSelf: 'center',
        paddingVertical: spacing['lg'] / 2,
    }
});
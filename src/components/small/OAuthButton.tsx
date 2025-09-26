import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { GoogleSignin, } from "@react-native-google-signin/google-signin"

import ThemeContext from '../../context/ThemeContext'

import { borderRadius, responsiveUtils, shadows, spacing, typography } from "../../util/designSystem"

import type { OAuthButtonProps } from '../../util/types';

import supabase from '../../api/supabase';


export default function OAuthButton(props: OAuthButtonProps) {
    const [isPressed, setPressed] = useState(false);

    const { theme } = useContext(ThemeContext)!;

    const textColor = theme.isDark ? theme.colors.textPrimary : theme.colors.textInverse;
    const isDisabled = props.loading;

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email', 'profile', 'openid'],
            webClientId: "25213505996-3fu5klf4vpfe1a3e1sg38v1j4o4c3fme.apps.googleusercontent.com",
        })
    }, []);

    const handlePress = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn();
            // const googleCredential = await supabase.auth.signInWithOAuth({
            //     provider: 'google',
            //     options: {
            //         scopes: 'email profile openid',
            //     }
            // })
            console.log(userInfo)
        } catch (err) {
            console.error(err)

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
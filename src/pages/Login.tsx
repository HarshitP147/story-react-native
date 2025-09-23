import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native"

import ThemeContext from '../context/ThemeContext';

import supabase from '../api/supabase';

import OAuthButton from '../components/small/OAuthButton';
import AuthButton from '../components/small/AuthButton';
import Input from '../components/small/Input';

import { typography, responsiveUtils, spacing, shadows, } from '../util/designSystem'


export default function Login() {
    const { theme } = useContext(ThemeContext)!;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation();

    // Check if credentials are fully entered
    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleLogin = async () => {
        setIsLoading(true);
        // Add your login logic here
        // Example:
        // try {
        //     await supabase.auth.signInWithPassword({ email, password });
        // } catch (error) {
        //     console.error('Login error:', error);
        // } finally {
        //     setIsLoading(false);
        // }

        // For now, just simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const keyboard = useAnimatedKeyboard();

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{
            translateY: -keyboard.height.value / 2
        }]
    }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <Animated.View style={animatedStyles}>

                        <Text style={[styles.authMessage, { color: theme.colors.textPrimary }]}>Login to your account</Text>

                        <View style={styles.credentialsContainer} >

                            <Input setMessage={setEmail} placeHolder='Your email' />
                            <Input setMessage={setPassword} placeHolder='Your password' password />

                            <AuthButton
                                type='login'
                                onPress={handleLogin}
                                disabled={!isFormValid}
                                loading={isLoading}
                            />
                        </View>
                    </Animated.View>

                    <View
                        style={{
                            marginVertical: spacing['xl'],
                            borderBottomColor: theme.colors.textSecondary,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: responsiveUtils.wp(80),
                            marginHorizontal: 'auto',
                        }}
                    />

                    <View style={styles.authProviders}>
                        <OAuthButton auth='google' type='login' />
                    </View>

                    <Text onPress={() => navigation.navigate("Signup")} style={{ color: theme.colors.info, ...styles.link }}>Don't have an account? Sign up</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        position: 'static',
        marginBottom: Keyboard.isVisible() ? responsiveUtils.hp(10) : 0,
    },
    authMessage: {
        fontSize: typography.fontSize['3xl'] * 1.2,
        marginTop: responsiveUtils.hp(18),
        marginBottom: spacing['lg'],
        fontWeight: '600',
        textAlign: "center"
    },
    credentialsContainer: {
        display: 'flex',
        gap: spacing.md,
        marginTop: spacing['2xl'],
        marginHorizontal: 'auto',
    },
    authProviders: {
        display: 'flex',
        gap: spacing.md,
        marginVertical: spacing['lg'],
        marginHorizontal: spacing['4xl']
    },
    link: {
        marginHorizontal: 'auto',
        marginTop: spacing['lg'],
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
}) 
import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native"

import ThemeContext from '../context/ThemeContext';

import supabase from '../api/supabase';

import AuthButton from '../components/small/AuthButton';
import OAuthButton from '../components/small/OAuthButton';
import Input from '../components/medium/Input';

import { typography, responsiveUtils, spacing, } from '../util/designSystem'
import AuthContext from '../context/AuthContext';


export default function Login() {
    const { theme } = useContext(ThemeContext)!;
    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOAuthLoading, setIsOAuthLoading] = useState(false);

    const navigation = useNavigation();

    // Check if credentials are fully entered
    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleLogin = async () => {
        // Basic validation
        if (!email.trim() || !password.trim()) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await signIn(email, password);
            
            if (!result.success) {
                Alert.alert('Login Failed', result.error || 'An error occurred during login');
            }
            // Success case is handled by the auth context listener
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsOAuthLoading(true);
        
        try {
            const result = await signInWithGoogle();
            
            if (!result.success) {
                Alert.alert('Google Login Failed', result.error || 'An error occurred with Google login');
            }
            // Success case is handled by the auth context listener
        } catch (error) {
            console.error('Google login error:', error);
            Alert.alert('Error', 'An unexpected error occurred with Google login. Please try again.');
        } finally {
            setIsOAuthLoading(false);
        }
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
                        <OAuthButton 
                            auth='google' 
                            type='login' 
                            loading={isOAuthLoading}
                            onPress={handleGoogleLogin}
                        />
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
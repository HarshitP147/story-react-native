import { use, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native"

import ThemeContext from '../context/ThemeContext';

import supabase from '../api/supabase';

import OAuthButton from '../components/small/OAuthButton';
import AuthButton from '../components/small/AuthButton';
import Input from '../components/small/Input';

import { typography, responsiveUtils, spacing, } from '../util/designSystem'


export default function Signup() {
    const { theme } = useContext(ThemeContext)!;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // const [isOAuthLoading, setIsOAuthLoading] = useState(false)

    const navigation = useNavigation();

    // Check if all credentials are fully entered
    const isFormValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

    const handleSignup = async () => {
        // Basic validation
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Validation Error', 'Password must be at least 6 characters long');
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
            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password: password,
            });

            if (error) {
                Alert.alert('Signup Failed', error.message);
                return;
            }

            if (data.user && !data.user.email_confirmed_at) {
                Alert.alert(
                    'Check Your Email', 
                    'Please check your email and click the confirmation link to complete your registration.',
                    [{ text: 'OK', onPress: () => console.log('Email confirmation reminder shown') }]
                );
            } else if (data.user) {
                Alert.alert(
                    'Success', 
                    'Account created successfully! You can now log in.',
                    [{ text: 'OK', onPress: () => {
                        // Clear form
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        // Navigate to login - you'll need to handle navigation properly
                        console.log('Navigate to login');
                    }}]
                );
            }

        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
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
                        <Text style={[styles.authMessage, { color: theme.colors.textPrimary }]}>Create a new account</Text>



                        <View style={styles.credentialsContainer} >

                            <Input setMessage={setEmail} placeHolder='Your email' />
                            <Input setMessage={setPassword} placeHolder='Your password' password eyeValidation />
                            <Input setMessage={setConfirmPassword} placeHolder='Confirm password' password />

                            <AuthButton
                                type='signup'
                                onPress={handleSignup}
                                disabled={!isFormValid}
                                loading={isLoading}
                            />

                        </View>
                    </Animated.View>

                    <Text onPress={() => navigation.navigate("Login")} style={{ color: theme.colors.info, ...styles.link }}>Already have an account? Log in</Text>
                </View>


            </TouchableWithoutFeedback>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
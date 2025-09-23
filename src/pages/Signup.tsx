import { use, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, } from 'react-native';
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

    const navigation = useNavigation();

    // Check if all credentials are fully entered
    const isFormValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

    const handleSignup = async () => {
        setIsLoading(true);
        // Add your signup logic here
        // Example:
        // try {
        //     await supabase.auth.signUp({ email, password });
        // } catch (error) {
        //     console.error('Signup error:', error);
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
                        <OAuthButton auth='google' type='signup' />
                        {/* <OAuthButton auth='apple' type='signup' /> */}
                    </View>

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
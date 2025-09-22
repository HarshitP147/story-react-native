import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ThemeContext from '../context/ThemeContext';

import supabase from '../api/supabase';

import OAuthButton from '../components/OAuthButton';
import Input from '../components/Input';

import { typography, responsiveUtils, spacing, } from '../util/designSystem'


export default function Login() {
    const { theme } = useContext(ThemeContext)!;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigation = useNavigation();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <Text style={[styles.authMessage, { color: theme.colors.textPrimary }]}>Login to your account</Text>

                    <View style={styles.credentialsContainer} >

                        <Input setMessage={setEmail} placeHolder='Your email' />
                        {/* <Input setMessage={setPassword} placeHolder='Your password' password eyeValidation /> */}
                        <Input setMessage={setPassword} placeHolder='Your password' password />

                    </View>

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
                        <OAuthButton auth='apple' type='login' />
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
        width: responsiveUtils.wp(80),
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
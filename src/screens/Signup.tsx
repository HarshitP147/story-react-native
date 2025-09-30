import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native"

import ThemeContext from '../context/ThemeContext';


import OAuthButton from '../components/small/OAuthButton';

import { typography, responsiveUtils, spacing, } from '../util/designSystem'


export default function Signup() {
    const { theme } = useContext(ThemeContext)!;

    const navigation = useNavigation();


    const keyboard = useAnimatedKeyboard();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <Text style={[styles.authMessage, { color: theme.colors.textPrimary }]}>Create a new account</Text>

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
                        {/* <OAuthButton auth='apple' type='signup' /> */}
                        <OAuthButton auth='google' type='signup' />
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
    authProviders: {
        display: 'flex',
        gap: spacing.lg,
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
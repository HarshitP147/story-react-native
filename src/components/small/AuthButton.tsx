import { useContext } from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet, ActivityIndicator } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ThemeContext from "../../context/ThemeContext";

import { borderRadius, responsiveUtils, spacing, typography } from "../../util/designSystem";

type AuthButtonProps = {
    type: 'login' | 'signup',
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export default function AuthButton(props: AuthButtonProps) {
    const { theme } = useContext(ThemeContext)!;

    // Button is disabled if explicitly disabled or loading
    const isDisabled = props.disabled || props.loading;

    const textColor = theme.isDark ? theme.colors.textPrimary : theme.colors.textInverse;


    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            style={{ elevation: 3 }}
            disabled={isDisabled}
        >
            <View style={[
                styles.button,
                {
                    backgroundColor: theme.colors.primary,
                    opacity: isDisabled ? 0.6 : 1,
                }
            ]}>
                {props.loading ? (
                    <ActivityIndicator
                        size={responsiveUtils.scale(24)}
                        color={textColor}
                    />
                ) : (
                    <MaterialIcons
                        name={props.type === 'login' ? 'login' : 'person-add'}
                        size={responsiveUtils.scale(24)}
                        color={textColor}
                    />
                )}
                <Text style={{
                    color: textColor,
                    textAlign: 'center',
                    fontSize: typography.fontSize['lg']
                }}>
                    {props.loading
                        ? (props.type === 'login' ? 'Logging in...' : 'Signing up...')
                        : (props.type === 'login' ? 'Login' : 'Sign Up')
                    }
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        letterSpacing: 1,
        alignItems: 'center',
        marginVertical: spacing.lg,
        gap: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
    },
});
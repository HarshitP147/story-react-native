// Updated DrawerContent.tsx using the custom switch
import { useContext } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

import Switch from "../small/Switch";

import { responsiveUtils, borderRadius, spacing, typography } from "../../util/designSystem";


export default function DrawerContent() {
    const { theme, toggleTheme } = useContext(ThemeContext)!;

    const { signOut } = useContext(AuthContext);

    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: theme.colors.background,
            borderRightColor: theme.colors.border,
        }]}>
            <Text style={[styles.menuText, {
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeight.semibold as any,
            }]}>
                Menu
            </Text>

            <View>
                <View style={[styles.themeToggleRow, {
                    paddingVertical: theme.spacing.sm,
                }]}>

                    <Text style={[styles.themeToggleText, {
                        color: theme.colors.textPrimary,
                        fontSize: theme.typography.fontSize.base,
                    }]}>
                        Dark theme
                    </Text>

                    <Switch
                        value={theme.isDark}
                        onValueChange={toggleTheme}
                        theme={theme}
                        size="medium"
                    />
                </View>

                <TouchableHighlight style={[styles.signout, {
                    backgroundColor: theme.colors.error,
                }]}
                    onPress={signOut}
                >
                    <View style={styles.signoutContainer}>
                        {/* Sign out button - implement sign out logic as needed */}
                        <MaterialIcons name="logout" size={responsiveUtils.scale(24)} color={theme.colors.textInverse} />
                        <Text style={{
                            color: theme.colors.textInverse,
                            fontWeight: theme.typography.fontWeight.semibold as any,

                        }}>
                            Sign out
                        </Text>
                    </View>

                </TouchableHighlight>
            </View>

        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        borderRightWidth: 1,
        paddingHorizontal: spacing.md,
        justifyContent: 'space-between',
        gap: spacing['lg'],
    },
    menuText: {
        fontSize: typography.fontSize.lg,
        marginVertical: spacing.xs,
        marginHorizontal: 'auto',
    },
    themeToggleRow: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md, // Default spacing
        marginBottom: spacing.lg,
    },
    themeToggleText: {
        fontSize: typography.fontSize.base, // Default font size
    },
    signoutContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.lg,
        paddingVertical: spacing.xs,
    },
    signout: {
        fontSize: typography.fontSize.lg,
        borderRadius: borderRadius.md,
        textAlign: 'center',
        marginBottom: spacing.md,
        paddingVertical: spacing.sm,
    }
});

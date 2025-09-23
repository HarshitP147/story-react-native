// Updated DrawerContent.tsx using the custom switch
import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeContext from "../../context/ThemeContext";

import Switch from "../small/Switch";

import { responsiveUtils, shadows } from "../../util/designSystem";


export default function DrawerContent() {
    const { theme, toggleTheme } = useContext(ThemeContext)!;

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
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        borderRightWidth: 1,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 18,
        marginVertical: 20,
    },
    themeToggleRow: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10, // Default spacing
    },
    themeToggleText: {
        fontSize: 16, // Default font size
    },
});

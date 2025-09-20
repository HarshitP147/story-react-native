// Updated DrawerContent.tsx using the custom switch
import { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeContext from "../context/ThemeContext";

import Switch from "./Switch";

export default function DrawerContent() {
    const { theme, toggleTheme } = useContext(ThemeContext)!;

    return (
        <SafeAreaView style={{
            backgroundColor: theme.colors.background,
            height: 'auto',
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: theme.colors.border,
            paddingHorizontal: 15
        }}>
            <Text style={{
                color: theme.colors.textPrimary,
                fontSize: 18,
                marginVertical: 20,
                fontWeight: theme.typography.fontWeight.semibold as any,
            }}>
                Menu
            </Text>

            <View style={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: theme.spacing.sm,
            }}>
                <Text style={{
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.fontSize.base,
                }}>
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

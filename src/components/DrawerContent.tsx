import { useContext, useState } from "react";
import { View, Text, Button, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeContext from "../context/ThemeContext";

export default function DrawerContent() {
    const { theme, toggleTheme } = useContext(ThemeContext)!;

    return (
        <SafeAreaView style={{
            backgroundColor: theme.colors.background,
            height: 'auto',
            flex: 1,
            paddingHorizontal: 10
        }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: 18, marginBottom: 20 }}>Menu</Text>
            <View style={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: theme.colors.textPrimary
                }}>Dark theme</Text>
                <Switch onChange={toggleTheme} value={theme.isDark} />
            </View>
        </SafeAreaView>
    )
}
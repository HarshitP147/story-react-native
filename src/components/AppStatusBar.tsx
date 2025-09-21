import { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import ThemeContext from "../context/ThemeContext";

export default function AppStatusBar() {
    const { theme } = useContext(ThemeContext)!;
    return <StatusBar backgroundColor={theme.colors.background} style="light" />;
}
import { useState, useContext } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { SafeAreaProvider, } from 'react-native-safe-area-context'

import Chat from './src/screens/Chat'

import ThemeContext, { ThemeProvider } from './src/context/ThemeContext'

import { createTheme } from './designSystem'

function StatusBar() {
    const { theme } = useContext(ThemeContext)!;
    return <ExpoStatusBar backgroundColor={theme.colors.background} style={theme.isDark ? 'light' : 'dark'} />;
}

export default function App() {
    const [darkTheme, setDarkTheme] = useState(true);

    const themeContextValue = {
        theme: createTheme(darkTheme),
        toggleTheme: () => setDarkTheme(!darkTheme)
    }


    return (
        <SafeAreaProvider >
            <ThemeProvider value={themeContextValue}>
                <StatusBar />
                <Chat />
            </ThemeProvider>
        </SafeAreaProvider>
    )
}
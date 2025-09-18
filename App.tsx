import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, } from 'react-native-safe-area-context'

import Chat from './src/screens/Chat'

import { createTheme, Theme } from './designSystem'



export default function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    const theme: Theme = createTheme(darkTheme); // Global theme management


    return (
        <SafeAreaProvider >
            <StatusBar backgroundColor={theme.colors.background} style={theme.isDark ? 'light' : 'dark'} />
            <Chat theme={theme} />
        </SafeAreaProvider>
    )
}
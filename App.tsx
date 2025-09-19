import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Chat from './src/screens/Chat'
import AppStatusBar from './src/components/AppStatusBar';
import DrawerContent from './src/components/DrawerContent';

import { ThemeProvider } from './src/context/ThemeContext'

import { createTheme } from './designSystem'

const Drawer = createDrawerNavigator();



export default function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    const themeContextValue = {
        theme: createTheme(darkTheme),
        toggleTheme: () => setDarkTheme(!darkTheme)
    }

    return (

        <SafeAreaProvider >
            <ThemeProvider value={themeContextValue}>
                <AppStatusBar />
                <NavigationContainer>
                    <Drawer.Navigator
                        screenOptions={{
                            headerTintColor: themeContextValue.theme.colors.textInverse,
                            headerStyle: {
                                backgroundColor: themeContextValue.theme.colors.secondaryDark,
                            }
                        }}
                        drawerContent={() => {
                            return <DrawerContent />
                        }}
                        initialRouteName="Chat"
                    >
                        <Drawer.Screen name="Chat" component={Chat} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </ThemeProvider >
        </SafeAreaProvider >
    );
}
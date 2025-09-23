import { useContext, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator, } from '@react-navigation/drawer';

import ThemeContext, { ThemeProvider } from './src/context/ThemeContext'

import Chat from './src/screens/Chat'
import Login from './src/pages/Login';
import AppStatusBar from './src/components/small/AppStatusBar';
import DrawerContent from './src/components/large/DrawerContent';

import { createTheme } from './src/util/designSystem'
import Signup from './src/pages/Signup';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerPage() {
    const { theme } = useContext(ThemeContext)!;

    return (
        <Drawer.Navigator
            screenOptions={{
                headerTintColor: theme.colors.textPrimary,
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
            }}

            drawerContent={() => {
                return <DrawerContent />
            }}
            initialRouteName="Chat"
        >
            <Drawer.Screen name="Chat" component={Chat} />
        </Drawer.Navigator>
    )
}


export default function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    const isSignedIn = false;

    const themeContextValue = {
        theme: createTheme(darkTheme),
        toggleTheme: () => setDarkTheme(!darkTheme)
    }

    return (
        <SafeAreaProvider >
            <ThemeProvider value={themeContextValue}>
                <AppStatusBar />
                <NavigationContainer>
                    <Stack.Navigator >
                        {isSignedIn ? (
                            <Stack.Screen name="Main" component={DrawerPage} options={{ headerShown: false }} />
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider >
        </SafeAreaProvider >
    );
}
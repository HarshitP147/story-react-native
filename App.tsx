import { useContext, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator, } from '@react-navigation/drawer';

import ThemeContext, { ThemeProvider } from './src/context/ThemeContext'
import AuthContext, { AuthProvider } from './src/context/AuthContext';

import Chat from './src/screens/Chat'
import Login from './src/pages/Login';
import AppStatusBar from './src/components/small/AppStatusBar';
import DrawerContent from './src/components/large/DrawerContent';

import { createTheme } from './src/util/designSystem'
import Signup from './src/pages/Signup';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNav() {
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

function StackNav() {
    const { isSignedIn } = useContext(AuthContext)!;

    return (
        <Stack.Navigator>
            {isSignedIn ? (
                <Stack.Screen name="Main" component={DrawerNav} options={{ headerShown: false }} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    )

}


export default function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    const { isSignedIn } = useContext(AuthContext)!;

    const themeContextValue = {
        theme: createTheme(darkTheme),
        toggleTheme: () => setDarkTheme(!darkTheme)
    }

    useEffect(() => {
        console.log("isSignedIn changed: ", isSignedIn);
    }, [isSignedIn]);

    return (
        <SafeAreaProvider>
            <ThemeProvider value={themeContextValue}>
                <AuthProvider>
                    <AppStatusBar />
                    <NavigationContainer>
                        <StackNav />
                    </NavigationContainer>
                </AuthProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
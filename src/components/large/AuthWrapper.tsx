import { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ThemeContext from '../../context/ThemeContext';
import AuthContext from '../../context/AuthContext';

interface AuthWrapperProps {
    children: React.ReactNode;
    authComponent: React.ReactNode;
}

export default function AuthWrapper({ children, authComponent }: AuthWrapperProps) {
    const { theme } = useContext(ThemeContext)!;
    const { isSignedIn, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return isSignedIn ? <>{children}</> : <>{authComponent}</>;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
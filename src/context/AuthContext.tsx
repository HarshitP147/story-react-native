import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import type { User, Session, AuthError } from "@supabase/supabase-js"

import supabase from "../api/supabase";

import { AuthContextType } from "../util/types";

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
    isSignedIn: false,
    signIn: async () => ({ success: false }),
    signUp: async () => ({ success: false }),
    signOut: async () => {},
    signInWithGoogle: async () => ({ success: false }),
});

export default AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state and set up auth listener
    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
            } else {
                setSession(session);
                setUser(session?.user ?? null);
            }
            setIsLoading(false);
        };

        getInitialSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session?.user?.email);
                setSession(session);
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    // Sign in with email and password
    const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: 'An unexpected error occurred' };
        }
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password: password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            // Check if email confirmation is required
            if (data.user && !data.user.email_confirmed_at) {
                return { 
                    success: true, 
                    error: 'Please check your email and click the confirmation link to complete your registration.' 
                };
            }

            return { success: true };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: 'An unexpected error occurred' };
        }
    };

    // Sign out
    const signOut = async (): Promise<void> => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Sign out error:', error);
                Alert.alert('Error', 'Failed to sign out');
            }
        } catch (error) {
            console.error('Sign out error:', error);
            Alert.alert('Error', 'An unexpected error occurred while signing out');
        }
    };

    // Sign in with Google OAuth
    const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: undefined, // You can configure this based on your needs
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            // OAuth flow will handle the redirect automatically
            return { success: true };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { success: false, error: 'An unexpected error occurred with Google sign in' };
        }
    };

    const value: AuthContextType = {
        user,
        session,
        isLoading,
        isSignedIn: !!user,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


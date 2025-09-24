import { createContext, useReducer } from "react";


const AuthContext = createContext<{
    email: string,
    isSignedIn: boolean,
    signIn: (email: string) => void,
    signOut: () => void,

}>({
    email: '',
    isSignedIn: false,
    signIn: (email: string) => { },
    signOut: () => { },
});

export default AuthContext;

type AuthAction = {
    type: 'SIGN_IN' | 'SIGN_OUT',
    payload?: {
        email?: string,
        password?: string,
    }
}

type AuthState = {
    isSignedIn: boolean,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                isSignedIn: true,
            }

        case 'SIGN_OUT':
            return {
                isSignedIn: false,
            };
        default:
            return state;
    }
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, {
        isSignedIn: false,
    });



    const value = {
        isSignedIn: state.isSignedIn,
        signIn: (email: string) => {
            dispatch({
                type: 'SIGN_IN',
                payload: { email },
            });
        },
        signOut: () => {
            dispatch({ type: 'SIGN_OUT' });
        },
    }


    return (
        <AuthContext.Provider value={{
            email: '',
            isSignedIn: state.isSignedIn,
            signIn: value.signIn,
            signOut: value.signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}





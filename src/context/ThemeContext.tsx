import { createContext } from "react";
import { createTheme } from "../util/designSystem";
import { Theme } from '../util/types';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>({
    theme: createTheme(false),
    toggleTheme: () => { },
});

export default ThemeContext;

export function ThemeProvider({ children, value }: { children: React.ReactNode; value: { theme: Theme; toggleTheme: () => void } }) {
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
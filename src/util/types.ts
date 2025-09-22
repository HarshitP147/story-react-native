
export interface ColorPalette {
    // Primary Colors
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Secondary Colors
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;

    // Accent Colors
    accent: string;
    accentSecondary: string;

    // Semantic Colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Backgrounds
    background: string;
    surface: string;
    surfaceElevated: string;

    // Text Colors
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Borders
    border: string;
    borderStrong: string;

    // Shadows
    shadowLight: string;
    shadowDark: string;
}

export interface TypographyConfig {
    fontFamily: {
        primary: string;
        secondary: string;
        mono: string;
    };
    fontSize: {
        xs: number;
        sm: number;
        base: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
        '4xl': number;
    };
    fontWeight: {
        light: string;
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
    };
    lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
    };
}

export interface SpacingConfig {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
}

export interface BorderRadiusConfig {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    full: number;
}

export interface ShadowStyle {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
}

export interface Theme {
    colors: ColorPalette;
    typography: TypographyConfig;
    spacing: SpacingConfig;
    borderRadius: BorderRadiusConfig;
    shadows: {
        neuromorphic: {
            light: ShadowStyle;
            dark: ShadowStyle;
        };
        sm: ShadowStyle;
        md: ShadowStyle;
        lg: ShadowStyle;
    };
    isDark: boolean;
}

export interface OAuthButtonProps {
    auth: "google" | "apple",
    type: "login" | "signup"
}
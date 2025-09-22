
import { Dimensions, PixelRatio } from 'react-native';

import type { BorderRadiusConfig, ColorPalette, ShadowStyle, SpacingConfig, Theme, TypographyConfig } from "./types"

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design reference - iPhone 14 Pro dimensions)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Responsive scaling functions
export const responsiveUtils = {
    // Scale width relative to base design
    wp: (percentage: number): number => {
        const value = (percentage * SCREEN_WIDTH) / 100;
        return Math.round(PixelRatio.roundToNearestPixel(value));
    },

    // Scale height relative to base design  
    hp: (percentage: number): number => {
        const value = (percentage * SCREEN_HEIGHT) / 100;
        return Math.round(PixelRatio.roundToNearestPixel(value));
    },

    // Scale font size based on screen width
    fs: (size: number): number => {
        const scale = SCREEN_WIDTH / BASE_WIDTH;
        const newSize = size * scale;
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    },

    // Scale any dimension proportionally
    scale: (size: number): number => {
        const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
        const newSize = size * scale;
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    },

    // Get device info
    deviceInfo: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        isSmallDevice: SCREEN_WIDTH < 375,
        isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
        isLargeDevice: SCREEN_WIDTH >= 414,
        isTablet: Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 768,
    },

    // Responsive margins/paddings
    getResponsiveSpacing: (baseSize: number) => {
        if (responsiveUtils.deviceInfo.isSmallDevice) return baseSize * 0.8;
        if (responsiveUtils.deviceInfo.isLargeDevice) return baseSize * 1.1;
        return baseSize;
    },
};


export const colors: { light: ColorPalette; dark: ColorPalette } = {
    // Light Theme
    light: {
        // Primary Colors - Deep, trustworthy blues for productivity
        primary: '#1e3a8a',      // Deep blue - main brand color
        primaryLight: '#3b82f6', // Lighter blue for hover states
        primaryDark: '#1e293b',  // Darker variant

        // Secondary Colors - Sophisticated grays
        secondary: '#475569',     // Cool gray for secondary text
        secondaryLight: '#64748b', // Lighter gray
        secondaryDark: '#334155', // Darker gray

        // Accent Colors - AI/Tech feel with energy
        accent: '#06b6d4',       // Cyan - for AI features, highlights
        accentSecondary: '#8b5cf6', // Purple - for premium features

        // Semantic Colors
        success: '#10b981',      // Green for completed tasks
        warning: '#f59e0b',      // Amber for warnings
        error: '#ef4444',        // Red for errors (used sparingly)
        info: '#3b82f6',         // Blue for information

        // Backgrounds - Neuromorphic friendly
        background: '#f8fafc',   // Main background
        surface: '#ffffff',      // Card/component backgrounds
        surfaceElevated: '#f1f5f9', // Slightly elevated surfaces

        // Text Colors - High contrast, eye-friendly
        textPrimary: '#0f172a',  // Main text
        textSecondary: '#475569', // Secondary text
        textTertiary: '#94a3b8',  // Tertiary text/placeholders
        textInverse: '#ffffff',   // Text on dark backgrounds

        // Borders and Dividers
        border: '#e2e8f0',       // Light borders
        borderStrong: '#cbd5e1',  // Stronger borders

        // Neuromorphic Shadows
        shadowLight: 'rgba(255, 255, 255, 0.8)',
        shadowDark: 'rgba(148, 163, 184, 0.25)',
    },

    // Dark Theme - True black background
    dark: {
        // Primary Colors - Vibrant for black background
        primary: '#4f46e5',      // Deeper indigo - pops against black
        primaryLight: '#6366f1', // Lighter indigo
        primaryDark: '#3730a3',  // Darker variant

        // Secondary Colors - Warm grays for better contrast on black
        secondary: '#a1a1aa',     // Neutral gray
        secondaryLight: '#d4d4d8', // Light gray
        secondaryDark: '#71717a', // Darker gray

        // Accent Colors - Brighter for black background
        accent: '#06b6d4',       // Cyan - maintains brand consistency
        accentSecondary: '#8b5cf6', // Purple - more vibrant for black

        // Semantic Colors - Enhanced visibility on black
        success: '#22c55e',      // Brighter green
        warning: '#eab308',      // More saturated yellow
        error: '#ef4444',        // Maintain red intensity
        info: '#3b82f6',         // Bright blue

        // Backgrounds - True black theme
        background: '#000000',   // Pure black
        surface: '#111111',      // Very dark gray for cards
        surfaceElevated: '#1a1a1a', // Slightly lighter for elevation

        // Text Colors - High contrast for black background
        textPrimary: '#ffffff',  // Pure white text
        textSecondary: '#d4d4d8', // Light gray
        textTertiary: '#a1a1aa',  // Medium gray for less important text
        textInverse: '#000000',   // Black text for light surfaces

        // Borders - Subtle but visible on black
        border: '#262626',       // Dark gray border
        borderStrong: '#404040', // Stronger border

        // Neuromorphic Shadows for true black theme
        shadowLight: 'rgba(255, 255, 255, 0.05)', // Subtle white highlight
        shadowDark: 'rgba(0, 0, 0, 0.8)',         // Deep black shadow
    }
};

export const typography: TypographyConfig = {
    // Font Families - System fonts for performance
    fontFamily: {
        primary: 'System', // iOS: SF Pro, Android: Roboto
        secondary: 'System',
        mono: 'Courier New', // For code/data display
    },

    // Font Sizes - Consistent scale
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
    },

    // Font Weights
    fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    // Line Heights
    lineHeight: {
        tight: 1.2,
        normal: 1.4,
        relaxed: 1.6,
    },
};

export const spacing: SpacingConfig = {
    // Responsive spacing scale - automatically adapts to screen size
    xs: responsiveUtils.scale(4),
    sm: responsiveUtils.scale(8),
    md: responsiveUtils.scale(16),
    lg: responsiveUtils.scale(24),
    xl: responsiveUtils.scale(32),
    '2xl': responsiveUtils.scale(40),
    '3xl': responsiveUtils.scale(48),
    '4xl': responsiveUtils.scale(64),
};

export const borderRadius: BorderRadiusConfig = {
    none: 0,
    sm: responsiveUtils.scale(4),
    md: responsiveUtils.scale(8),
    lg: responsiveUtils.scale(12),
    xl: responsiveUtils.scale(16),
    '2xl': responsiveUtils.scale(20),
    full: 9999,
};

export const shadows = {
    // Neuromorphic shadow presets
    neuromorphic: {
        light: {
            shadowColor: colors.light.shadowDark,
            shadowOffset: { width: -2, height: -2 },
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 3,
        } as ShadowStyle,
        dark: {
            shadowColor: colors.light.shadowLight,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 3,
        } as ShadowStyle
    },

    // Neuromorphic shadows for black theme
    neuromorphicDark: {
        light: {
            shadowColor: colors.dark.shadowLight,
            shadowOffset: { width: -1, height: -1 },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 2,
        } as ShadowStyle,
        dark: {
            shadowColor: colors.dark.shadowDark,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 4,
        } as ShadowStyle
    },

    // Standard shadows
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    } as ShadowStyle,

    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    } as ShadowStyle,

    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    } as ShadowStyle,
};

// Theme Context for easy switching
export const createTheme = (isDark = false): Theme => ({
    colors: isDark ? colors.dark : colors.light,
    typography: typography,
    spacing: spacing,
    borderRadius: borderRadius,
    shadows: shadows,
    isDark,
});

// Pre-built component styles with proper typing
export const componentStyles = {
    // Neuromorphic Card Style - adapts to theme
    card: (theme: Theme) => ({
        backgroundColor: theme.colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        // Use different neuromorphic shadows based on theme
        ...(theme.isDark ? shadows.neuromorphicDark.light : shadows.neuromorphic.light),
        borderWidth: 1,
        borderColor: theme.colors.border,
    }),

    // Button Styles
    button: {
        primary: (theme: Theme) => ({
            backgroundColor: theme.colors.primary,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
            borderRadius: borderRadius.md,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            ...shadows.md,
        }),

        secondary: (theme: Theme) => ({
            backgroundColor: theme.colors.surface,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
            borderRadius: borderRadius.md,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            borderWidth: 1,
            borderColor: theme.colors.border,
            ...shadows.sm,
        }),

        neuromorphic: (theme: Theme) => ({
            backgroundColor: theme.colors.surface,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
            borderRadius: borderRadius.xl,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            ...(theme.isDark ? shadows.neuromorphicDark.light : shadows.neuromorphic.light),
            borderWidth: 1,
            borderColor: theme.colors.border,
        }),
    },

    // Text Styles
    text: {
        h1: (theme: Theme) => ({
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold as any,
            color: theme.colors.textPrimary,
            lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
        }),

        h2: (theme: Theme) => ({
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.semibold as any,
            color: theme.colors.textPrimary,
            lineHeight: typography.fontSize['2xl'] * typography.lineHeight.normal,
        }),

        body: (theme: Theme) => ({
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.normal as any,
            color: theme.colors.textPrimary,
            lineHeight: typography.fontSize.base * typography.lineHeight.normal,
        }),

        caption: (theme: Theme) => ({
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.normal as any,
            color: theme.colors.textSecondary,
            lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
        }),
    },

    // Input Styles
    input: (theme: Theme) => ({
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        fontSize: typography.fontSize.base,
        color: theme.colors.textPrimary,
        ...shadows.sm,
    }),

    // AI Feature Highlight Styles - Enhanced for black theme
    aiHighlight: (theme: Theme) => ({
        backgroundColor: theme.colors.accent + (theme.isDark ? '15' : '10'), // More opacity on black
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.accent,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
        // Add subtle glow effect for dark theme
        ...(theme.isDark && {
            shadowColor: theme.colors.accent,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        }),
    }),
};
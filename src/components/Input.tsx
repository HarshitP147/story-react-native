import { useContext, useState, useEffect } from "react"
import { TextInput } from "react-native-gesture-handler"

import ThemeContext from "../context/ThemeContext"

import { componentStyles, ResponsiveUtils } from "../util/designSystem";


export default function Input({ setMessage }: {
    setMessage: (message: string) => void;
}) {
    const [text, setText] = useState('')

    const { theme } = useContext(ThemeContext)!;
    const [inputHeight, setInputHeight] = useState(ResponsiveUtils.scale(44)); // Base height for single line

    // Calculate line height based on font size
    const lineHeight = ResponsiveUtils.scale(20);
    const minHeight = ResponsiveUtils.scale(44);
    const maxHeight = lineHeight * 3 + ResponsiveUtils.scale(24); // 3 lines + padding

    const handleContentSizeChange = (event: any) => {
        const { contentSize } = event.nativeEvent;
        // Ensure height doesn't go below minimum or above maximum
        const newHeight = Math.max(minHeight, Math.min(contentSize.height, maxHeight));
        setInputHeight(newHeight);
    };

    useEffect(() => {
        let timeout = setTimeout(() => {
            setMessage(text)
        }, 500);

        return () => {
            clearTimeout(timeout)
        }
    }, [text])


    return (
        <TextInput
            style={{
                ...componentStyles.input(theme),
                width: ResponsiveUtils.wp(70),
                height: inputHeight,
                backgroundColor: theme.colors.surface,
                textAlignVertical: 'top',
                borderColor: theme.colors.textTertiary,
                borderRadius: theme.borderRadius.md,
                paddingVertical: ResponsiveUtils.scale(12),
                paddingHorizontal: ResponsiveUtils.scale(16),
                lineHeight: lineHeight,
                elevation: 0
            }}
            value={text}
            onChangeText={(newText) => setText(newText)}

            onContentSizeChange={handleContentSizeChange}
            multiline={true}
            numberOfLines={3}
            placeholder="Type your message..."
            placeholderTextColor={theme.colors.textTertiary}
            maxLength={1000}
            returnKeyType="default"
        />
    )
}


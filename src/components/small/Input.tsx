import { useContext, useState, useEffect } from "react"
import { View, TextInput, TouchableNativeFeedback } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import ThemeContext from "../../context/ThemeContext"

import { componentStyles, responsiveUtils } from "../../util/designSystem";


export default function Input(props: {
    setMessage: (message: string) => void,
    placeHolder?: string,
    password?: boolean,
    eyeValidation?: boolean
}) {
    const [text, setText] = useState('')
    const [isPassword, showPassword] = useState(props.password)

    const { theme } = useContext(ThemeContext)!;
    const [inputHeight, setInputHeight] = useState(responsiveUtils.scale(44)); // Base height for single line

    // Calculate line height based on font size
    const lineHeight = responsiveUtils.scale(20);
    const minHeight = responsiveUtils.scale(44);
    const maxHeight = lineHeight * 3 + responsiveUtils.scale(24); // 3 lines + padding

    const handleContentSizeChange = (event: any) => {
        const { contentSize } = event.nativeEvent;
        // Ensure height doesn't go below minimum or above maximum
        const newHeight = Math.max(minHeight, Math.min(contentSize.height, maxHeight));
        setInputHeight(newHeight);
    };

    useEffect(() => {
        let timeout = setTimeout(() => {
            props.setMessage(text)
        }, 500);

        return () => {
            clearTimeout(timeout)
        }
    }, [text])


    return (
        <View style={{
            position: 'relative',
            width: responsiveUtils.wp(70),
        }}>
            <TextInput
                style={{
                    ...componentStyles.input(theme),
                    width: '100%',
                    height: inputHeight,
                    backgroundColor: theme.colors.surface,
                    textAlignVertical: 'top',
                    borderColor: theme.colors.textTertiary,
                    borderRadius: theme.borderRadius.md,
                    paddingVertical: responsiveUtils.scale(12),
                    paddingHorizontal: responsiveUtils.scale(16),
                    paddingRight: (props.password && props.eyeValidation) ? responsiveUtils.scale(48) : responsiveUtils.scale(16), // Add space for icon only if eye is shown
                    lineHeight: lineHeight,
                    elevation: 0,
                }}
                value={text}
                onChangeText={(newText) => setText(newText)}
                onContentSizeChange={handleContentSizeChange}
                multiline={!props.password} // Disable multiline for password inputs
                secureTextEntry={isPassword}
                numberOfLines={props.password ? 1 : 3}
                placeholder={props.placeHolder || "Enter a message..."}
                placeholderTextColor={theme.colors.textTertiary}
                maxLength={1000}
                returnKeyType="default"
            />
            {props.password && props.eyeValidation && (
                <TouchableNativeFeedback onPress={() => showPassword(value => !value)}>
                    <View style={{
                        position: 'absolute',
                        right: responsiveUtils.scale(12),
                        top: '50%',
                        transform: [{ translateY: -responsiveUtils.scale(12) }],
                        padding: responsiveUtils.scale(4), // Add padding for better touch target
                    }}>
                        <Feather
                            name={isPassword ? 'eye' : 'eye-off'}
                            size={responsiveUtils.scale(20)}
                            color={theme.colors.textSecondary}
                        />
                    </View>
                </TouchableNativeFeedback>

            )}
        </View>
    )
}


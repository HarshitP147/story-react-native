import { useState, useContext } from 'react'
import { View, StyleSheet, TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import ThemeContext from '../context/ThemeContext'

import Input from '../components/Input'

import { responsiveUtils } from '../util/designSystem'


export default function InputBox() {
    const { theme } = useContext(ThemeContext)!;

    const [message, setMessage] = useState('')

    function handleSend() {
        console.log(message);
    }

    return (
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.borderStrong }]}>
            <TouchableHighlight style={{
                borderRadius: theme.borderRadius.full,
                padding: responsiveUtils.scale(10),
                backgroundColor: theme.colors.secondaryLight,
            }}>
                <MaterialIcons name="multitrack-audio" size={responsiveUtils.scale(28)} color={theme.colors.textInverse} />
            </TouchableHighlight>
            <Input setMessage={setMessage} />
            <TouchableHighlight style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.borderRadius.full,
                padding: responsiveUtils.scale(10),
                borderColor: theme.colors.primary,
                borderWidth: 1
            }}
                onPress={handleSend}
            >
                <MaterialIcons name="send" size={responsiveUtils.scale(28)} color={'white'} />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 0,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveUtils.scale(4),
        paddingHorizontal: responsiveUtils.scale(16),
        paddingTop: responsiveUtils.scale(12),
        paddingBottom: responsiveUtils.scale(24),
    }
});
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { componentStyles, type Theme, ResponsiveUtils } from '../../designSystem'


// A long list fake
const messages = Array.from({ length: 100 }, (_, i) => `Message ${i + 1}`);


export default function MessageList({ theme }: { theme: Theme }) {
    return (
        <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={[componentStyles.card(theme), styles.messageContainer]}>
                    <Text style={componentStyles.text.body(theme)}>
                        {item}
                    </Text>
                </View>
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        marginBottom: ResponsiveUtils.scale(8),
        // Remove padding since ComponentStyles.card already provides it
    },
    listContainer: {
        padding: ResponsiveUtils.scale(16),
        paddingBottom: ResponsiveUtils.scale(120), // Responsive bottom padding
    },
})
import { View, Text, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Auth() {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>Auth Screen</Text>
        </SafeAreaView>
    )
}

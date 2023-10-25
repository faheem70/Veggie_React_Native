import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
function PhoneSignIn() {
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const navigation = useNavigation();
    function onAuthStateChanged(user) {
        if (user) {
            // Handle successful login
            navigation.navigate("Home");
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    if (!confirm) {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 140, height: 100 }}
                    source={{
                        uri: "https://t3.ftcdn.net/jpg/04/40/13/20/360_F_440132038_9N4HdfG5bpVn1SKWIZVcsrVEQ8eDzvrz.jpg",
                    }}
                />
                <Button
                    title="Phone Number Sign In"
                    onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
                />
            </View>
        );
    }

    return (

        <View style={styles.container}>
            <Image
                style={{ width: 140, height: 100 }}
                source={{
                    uri: "https://t3.ftcdn.net/jpg/04/40/13/20/360_F_440132038_9N4HdfG5bpVn1SKWIZVcsrVEQ8eDzvrz.jpg",
                }}
            />
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={(text) => setCode(text)}
            />
            <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
});

export default PhoneSignIn;

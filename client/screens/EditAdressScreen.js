import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Pressable, Alert } from 'react-native';
import axios from 'axios';

const EditAddressScreen = ({ route, navigation }) => {
    const { addressId } = route.params;
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [postalCode, setPostalCode] = useState('');

    useEffect(() => {
        // Fetch the existing address details based on addressId
        axios.get(`https://arf-veg.onrender.com/addresses/${addressId}`)
            .then((response) => {
                const existingAddress = response.data;
                setName(existingAddress.name);
                setMobileNo(existingAddress.mobileNo);
                setHouseNo(existingAddress.houseNo);
                setStreet(existingAddress.street);
                setLandmark(existingAddress.landmark);
                setPostalCode(existingAddress.postalCode);
            })
            .catch((error) => {
                console.error(error);
                // Handle the error
            });
    }, [addressId]);

    const handleEditAddress = () => {
        const updatedAddress = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode,
        };

        // Send a PUT request to update the address
        axios.put(`https://arf-veg.onrender.com/addresses/${addressId}`, updatedAddress)
            .then(() => {
                Alert.alert('Success', 'Address updated successfully');
                navigation.navigate('Addresses'); // Navigate back to the Addresses screen
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to update address');
                console.error(error);
            });
    };

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
                Edit Address
            </Text>

            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Full Name"
                style={styles.input}
            />

            <TextInput
                value={mobileNo}
                onChangeText={(text) => setMobileNo(text)}
                placeholder="Mobile Number"
                style={styles.input}
            />

            <TextInput
                value={houseNo}
                onChangeText={(text) => setHouseNo(text)}
                placeholder="House No"
                style={styles.input}
            />

            <TextInput
                value={street}
                onChangeText={(text) => setStreet(text)}
                placeholder="Street"
                style={styles.input}
            />

            <TextInput
                value={landmark}
                onChangeText={(text) => setLandmark(text)}
                placeholder="Landmark"
                style={styles.input}
            />

            <TextInput
                value={postalCode}
                onChangeText={(text) => setPostalCode(text)}
                placeholder="Postal Code"
                style={styles.input}
            />

            <Pressable
                onPress={handleEditAddress}
                style={styles.addButton}
            >
                <Text style={styles.buttonText}>Edit Address</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = {
    input: {
        padding: 10,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#FFC72C',
        padding: 19,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontWeight: 'bold',
    },
};

export default EditAddressScreen;

// ProductUpdateScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UpdateProductScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const updateProduct = () => {
        axios.put(`https://arf-veg.onrender.com/products/${productId}`, {
            name,
            category,
            image,
            price,
            quantity,
        })
            .then((response) => {
                // Handle success (e.g., show a success message, navigate back to the product list screen)
                console.log(response);
            })
            .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Update Product</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Category"
                value={category}
                onChangeText={(text) => setCategory(text)}
            />
            <TextInput
                placeholder="Image URL"
                value={image}
                onChangeText={(text) => setImage(text)}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={(text) => setPrice(text)}
            />
            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
            />
            <Button title="Update" onPress={updateProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UpdateProductScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleAddProduct = () => {
        // Create a new product object
        const newProduct = {
            name,
            category,
            image,
            price,
            quantity,
        };

        // Send a POST request to add the new product to your backend
        axios.post('https://arf-veg.onrender.com/products', newProduct)
            .then((response) => {
                // Handle success, e.g., show a success message or navigate to a different screen
                console.log('Product added:', response.data);
            })
            .catch((error) => {
                console.error('Error adding product:', error);
                // Handle the error, e.g., show an error message
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a New Product</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity" // Add the quantity field
                value={quantity}
                onChangeText={setQuantity}
            />
            <Button title="Submit" onPress={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 12,
    },
});

export default NewProduct;

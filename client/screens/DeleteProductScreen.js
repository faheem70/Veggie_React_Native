// ProductListScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Axios from 'axios';

const DeleteProductScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the list of products from your API
        Axios.get('http://10.0.2.2:8000/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const deleteProduct = (productId) => {
        Axios.delete(`http://10.0.2.2:8000/products/${productId}`)
            .then((response) => {
                // Handle success (e.g., update the product list after deletion)
                setProducts(products.filter((product) => product._id !== productId));
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Product List</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text>{item.name}</Text>
                        <Button
                            title="Delete"
                            onPress={() => deleteProduct(item._id)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default DeleteProductScreen;

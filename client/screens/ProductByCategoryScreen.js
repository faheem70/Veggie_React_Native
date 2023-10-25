import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const ProductsByCategoryScreen = ({ route }) => {
    const { categoryId } = route.params; // Get the category ID from route params
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProductsByCategory() {
            try {
                const response = await axios.get(`https://arf-veg.onrender.com/products/category/${categoryId}`);
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProductsByCategory();
    }, [categoryId]); // Add categoryId as a dependency

    return (
        <ScrollView>
            {products.map((product) => (
                <ProductItem key={product._id} product={product} />
            ))}
        </ScrollView>
    );
};

export default ProductsByCategoryScreen;

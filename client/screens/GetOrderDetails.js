import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

function GetOrderDetails({ userId }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(`https://arf-veg.onrender.com/orders/${userId}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders", error);
            });
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Orders</Text>
            <View style={styles.orderList}>
                {orders.map((order) => (
                    <View key={order._id} style={styles.orderItem}>
                        <Text style={styles.orderInfo}>
                            <Text style={styles.label}>Order ID:</Text> {order._id}
                        </Text>
                        <Text style={styles.orderInfo}>
                            <Text style={styles.label}>Total Price:</Text> ${order.totalPrice}
                        </Text>
                        <Text style={styles.orderInfo}>
                            <Text style={styles.label}>Shipping Address:</Text> {order.shippingAddress}
                        </Text>
                        {/* Display other order details as needed */}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    orderList: {
        marginTop: 10,
    },
    orderItem: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        marginBottom: 10,
        borderRadius: 5,
    },
    orderInfo: {
        fontSize: 16,
    },
    label: {
        fontWeight: "bold",
    },
});

export default GetOrderDetails;

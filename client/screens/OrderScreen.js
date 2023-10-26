import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderScreen = ({ route }) => {
  // Assuming you pass order details via route.params
  const { orderDetails } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.orderDetails}>
        <Text>Order ID: {orderDetails.orderId}</Text>
        <Text>Total Price: ${orderDetails.totalPrice}</Text>
        <Text>Shipping Address: {orderDetails.shippingAddress}</Text>
        <Text>Payment Method: {orderDetails.paymentMethod}</Text>
        {/* Add more order details as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderDetails: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
});

export default OrderScreen;

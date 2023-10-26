/*import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >


        <View style={""}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
          <Text style={""}></Text>
          <Text style={""}>{item?.quantity}</Text>
        </View>

      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});*/
import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const windowWidth = Dimensions.get('window').width;

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <Pressable style={[styles.container, { width: windowWidth - 40 }]}>
      <Image
        style={{ width: windowWidth - 40, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: windowWidth - 40, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>{item?.name}</Text>
        <Text style={styles.detailText}>₹{item?.price}</Text>
        <Text style={styles.detailText}>{item?.quantity}</Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={styles.addToCartButton}
      >
        {addedToCart ? (
          <Text>Added to Cart</Text>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  detailsContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default ProductItem;


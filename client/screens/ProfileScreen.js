import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://t3.ftcdn.net/jpg/04/40/13/20/360_F_440132038_9N4HdfG5bpVn1SKWIZVcsrVEQ8eDzvrz.jpg",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://arf-veg.onrender.com/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://arf-veg.onrender.com/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  const handleShowOrders = () => {
    setShowOrders(true); // When "Your orders" is pressed, set showOrders to true
  };

  const handleNavigateToProfile = () => {
    navigation.navigate("Profile"); // Replace "Profile" with the name of your "Profile" screen
  };
  const handleNavigateToNewProduct = () => {
    if (user.email === "faheemakhtar19730@gmail.com") {
      // Navigate to the "NewProduct" screen (replace with the actual screen name)
      navigation.navigate("NewProduct");
    }
  };

  const handleNavigateToUpdateProduct = () => {
    if (user.email === "faheemakhtar19730@gmail.com") {
      // Navigate to the "NewProduct" screen (replace with the actual screen name)
      navigation.navigate("Update");
    }

  }
  const handleNavigateToDeleteProduct = () => {
    if (user.email === "faheemakhtar19730@gmail.com") {
      // Navigate to the "NewProduct" screen (replace with the actual screen name)
      navigation.navigate("Delete");
    }
  }

  const handleNavigateToOrderDetails = () => {
    if (user.email === "faheemakhtar19730@gmail.com") {
      // Navigate to the "NewProduct" screen (replace with the actual screen name)
      navigation.navigate("Detail");
    }
  }
  // console.log("orders", orders);
  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user?.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
          onPress={handleShowOrders}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
          onPress={handleNavigateToProfile}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </Pressable>
        {user?.email === "faheemakhtar19730@gmail.com" && (
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
            onPress={handleNavigateToNewProduct}
          >
            <Text style={{ textAlign: "center" }}>New Product</Text>
          </Pressable>

        )}
        {user?.email === "faheemakhtar19730@gmail.com" && (
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
            onPress={handleNavigateToUpdateProduct}
          >
            <Text style={{ textAlign: "center" }}>UpdateProduct</Text>
          </Pressable>

        )}
        {user?.email === "faheemakhtar19730@gmail.com" && (
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
            onPress={handleNavigateToDeleteProduct}
          >
            <Text style={{ textAlign: "center" }}>DeleteProduct</Text>
          </Pressable>

        )}

        {user?.email === "faheemakhtar19730@gmail.com" && (
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
            onPress={handleNavigateToOrderDetails}
          >
            <Text style={{ textAlign: "center" }}>OrderDetails</Text>
          </Pressable>

        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>

      {showOrders && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text>Loading...</Text>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable
                style={{
                  // ... (your order container styles)
                }}
                key={order._id}
              >
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={{ marginVertical: 10 }} key={product._id}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";


const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://spendsmart.extension.iastate.edu/wp-content/uploads/2014/06/vegetables-variety.jpg",
      name: "vegetables",
    },
    {
      id: "1",
      image:
        "https://previews.123rf.com/images/photomaru/photomaru1510/photomaru151000012/46658347-pile-of-various-fresh-fruits-over-white-background.jpg",
      name: "fruits",
    },
    {
      id: "3",
      image:
        "https://www.bigbasket.com/media/uploads/p/xxl/10000539_4-bb-royal-mixed-dry-fruits.jpg",
      name: "dry friuts",
    },
    {
      id: "4",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3922575/all-grocery-items-500x500.jpg",
      name: "grocery",
    },
    {
      id: "5",
      image:
        "https://chaldn.com/_mpimage/cereals?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D71049&q=best&v=1&m=400",
      name: "Breakfast",
    },

  ];
  const images = [
    "https://delmonte-sitefinity-public.s3.amazonaws.com/images/default-source/hompage-carousel-backgrounds/honeyglow_sweetest-side-of-life_banner_1300-x-50043818711ae484dc2a2764ddd48534898.jpg?sfvrsn=bc84c443_2",
    "https://ghoshak-website-builder.s3.amazonaws.com/78b31aa1-b72f-437a-ad0e-778bf352cb4c.jpeg",
    "https://ahallya.in/wp-content/uploads/2020/11/pengpos-fresh-produces-website-banner-940x400-1.png",
  ];
  const deals = [
    {
      id: "20",
      title: "Apple",
      oldPrice: 150,
      price: 100,
      image:
        "https://i.pinimg.com/736x/39/01/2c/39012c0f20bc5d4a7a55e6903d129a12.jpg",
      carouselImages: [
        "https://i.pinimg.com/736x/39/01/2c/39012c0f20bc5d4a7a55e6903d129a12.jpg",
        "https://freshindiaorganics.com/cdn/shop/products/Apples.jpg?v=1686739530",
        "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",

      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
    {
      id: "30",
      title:
        "Pomegrante",
      oldPrice: 150,
      price: 120,
      image:
        "https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_725163_16631634171257083.png",
      carouselImages: [
        "https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_725163_16631634171257083.png",
        "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/02/pomegranate-seeds-fruit-1296x728-header.jpg?w=1155&h=1528",
        "https://images.healthshots.com/healthshots/en/uploads/2021/09/27184641/pomegranate-1600x900.jpg",

      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
    {
      id: "40",
      title:
        "Mushroom",
      oldPrice: 150,
      price: 80,
      image:
        "https://m.media-amazon.com/images/I/71XMKwfQCzL.jpg",
      carouselImages: [
        "https://www.reliablebasket.in/uploads/product_image/1608855553.jpeg",
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/278/278858/mushrooms-in-a-bowel-on-a-dark-table.jpg",
        "https://m.media-amazon.com/images/I/71XMKwfQCzL.jpg",
      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
    {
      id: "40",
      title:
        "Aashirvad",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://5.imimg.com/data5/DS/WE/GLADMIN-17396827/aashirvaad-atta-5-kg.png",
      carouselImages: [
        "https://5.imimg.com/data5/SELLER/Default/2022/3/PD/KP/WB/148540348/aashirvaad-atta-5kg.jpg",
        "https://i.ytimg.com/vi/y_vzst8GFhk/maxresdefault.jpg",

      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Safal Peas",
      offer: "72% off",
      oldPrice: 100,
      price: 80,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40006613_1-safal-frozen-green-peas.jpg?tr=w-640,q=80",
      carouselImages: [
        "https://www.bigbasket.com/media/uploads/p/l/40006613_1-safal-frozen-green-peas.jpg?tr=w-640,q=80",
        "https://www.bigbasket.com/media/uploads/p/l/40006613-2_2-safal-frozen-green-peas.jpg?tr=w-640,q=80",
        "https://www.bigbasket.com/media/uploads/p/l/40006613-3_2-safal-frozen-green-peas.jpg?tr=w-640,q=80",

      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",

    },
    {
      id: "1",
      title:
        "Almonds",
      offer: "40%",
      oldPrice: 210,
      price: 180,
      image: "https://m.media-amazon.com/images/I/71Qpb6-l+fL._AC_UF1000,1000_QL80_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71Qpb6-l+fL._AC_UF1000,1000_QL80_.jpg",
        "https://nuttyyogi.com/cdn/shop/products/Almonds.jpg?v=1606373738",
        "https://5.imimg.com/data5/SELLER/Default/2023/1/ZN/KZ/GM/31056044/raw-fresh-almonds.jpg",
      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
    {
      id: "2",
      title: "Kiwi",
      offer: "40%",
      oldPrice: 160,
      price: 140.65,
      image: "https://www.shutterstock.com/image-photo/plastic-packaging-kiwi-on-white-260nw-122537464.jpg",
      carouselImages: ["https://www.shutterstock.com/image-photo/plastic-packaging-kiwi-on-white-260nw-122537464.jpg"],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
    {
      id: "3",
      title:
        "Arhar Daal",
      offer: "40%",
      oldPrice: 180,
      price: 110,
      image: "https://m.media-amazon.com/images/I/61Ci++pSECL.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61Ci++pSECL.jpg",
        "https://m.media-amazon.com/images/I/81jiJ7DTGGL._AC_UF1000,1000_QL80_.jpg",
        "https://www.ritirivaaj.com/cdn/shop/products/Unpolished-Toor-Arhar-Dal-Riti-Rivaaj-Grocery.jpg?v=1624796314",
      ],
      about: "The Skin of the apple is smooth and flavorless.",
      benefits: "Apples are rich in dietry fibres. vitamins, minerals, and folates",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("fruits");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdress] = useState("");

  console.log(selectedAddress)
  const [items, setItems] = useState([
    { label: "Fruits", value: "fruits" },
    { label: "Breakfast", value: "breakfast" },
    { label: "Dry Fruits", value: "dry-fruits" },
    { label: "Vegetables", value: "vegetables" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://arf-veg.onrender.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://arf-veg.onrender.com/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("address", addresses);
  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const navigateToCategory = (categoryName) => {
    navigation.navigate("ProductByCategory", { categoryName });
  };
  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search ARF.in" />
            </Pressable>

            <Feather name="mic" size={24} color="black" />
          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEB7",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add a Address
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => navigateToCategory(item.name)}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoplay={true}  // Set to true for autoplay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%", height: 200 }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Deals of the Day
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    about: item?.about,
                    benefits: item?.benefits,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}

              setValue={onCategoryChange}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />

          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Uttar Pradesh
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />



                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Use My Currect location
                </Text>

            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

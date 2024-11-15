import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { decrementQuantity, incementQuantity, removeFromCart, } from "../../redux/CartReducer";
import Lottie from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ID, POST_ADD } from '../../api/apiService';

const CartItem = ({ onTotalChange }) => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    // const [carts, setCarts] = useState([]);

    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGetUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            setToken(token);
            const userId = await AsyncStorage.getItem("userId");
            setUserId(userId);
        }
        fetchGetUser();
    }, [])


    // const fetchCart = async () => {
    //     try {
    //         const response = await GET_ID("carts", userId);
    //         setCarts(response.data);
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchCart();
    // }, [])

    const flag = true;
    const total = cart.map((item) => (item.price - (item.price * item.discount / 100)) * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const increaseQuantity = async (item) => {
        try {
            if (flag) {
                dispatch(incementQuantity({
                    ...item,
                    quantity: item.colors[0].quantity
                }));
            } else {
                Toast.show({
                    text1: 'Thông báo',
                    text2: `Sản phẩm hết hàng! Vui lòng thử lại sau`,
                    type: 'error',
                    position: 'top',
                });
            }
            if (token) {
                const data = {
                    cartId: userId,
                    colorId: item.colorId,
                    quantity: 1
                }
                await POST_ADD("carts", data)
            }
        }
        catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Thông báo',
                text2: `Sản phẩm hết hàng! Vui lòng thử lại sau`,
                type: 'error',
                position: 'top',
            });
        }

    };
    const decreaseQuantity = async (item) => {
        try {
            dispatch(decrementQuantity(item));
            if (token) {
                const data = {
                    cartId: userId,
                    colorId: item.colorId,
                    quantity: 1
                }
                await POST_ADD("carts/remove", data)
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const deleteItem = async (item) => {
        try {
            dispatch(removeFromCart(item));

            if (token) {
                const data = {
                    cartId: userId,
                    colorId: item.colorId,
                }
                await POST_ADD("carts/delete", data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('vi-VN') + ' đ';
    };
    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };
    useEffect(() => {
        onTotalChange(total);
    }, [total]);


    const renderItem = ({ item }) => (

        <View style={styles.cartItem}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => { navigation.navigate('DetailScreen', { colorId: item.colorId }) }}>
                <Image style={styles.image} source={{ uri: item.colors[0].imageUrl }} resizeMode="contain" />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name} {item.size}</Text>
                    <Text>Màu:<Text>{item.colors[0].color}</Text></Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.salePrice}>
                            {formatPrice(calculateDiscountedPrice(item.price, item.discount))}
                        </Text>
                        <Text style={styles.originalPrice}>{formatPrice(item.price)}</Text>
                    </View>
                    <Text>Số lượng:</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.removeButtonContainer}>
                <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={styles.removeButton}>
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.quantityContainer}>
                {item.quantity > 1 ? (
                    <TouchableOpacity
                        onPress={() => decreaseQuantity(item)}
                        style={styles.quantityButton}  >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => deleteItem(item)}
                        style={styles.quantityButton}  >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    onPress={() => increaseQuantity(item)}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.containerCart}>
            {cart.length === 0 ? (
                <>

                    <View style={styles.noCotainer}>
                        <Text style={styles.noText}>Hiện chưa có thông tin đặt hàng !</Text>
                    </View>

                </>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={item => item.colorId}
                    />
                </>
            )}
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    containerCart: {
        marginTop: 5,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#CCC'
    },
    cartItem: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginBottom: 15,
        position: 'relative'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 70,
    },
    itemDetails: {
        marginLeft: 10,
    },
    itemName: {
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
    },
    salePrice: {
        color: "#d70018",
        paddingRight: 10,
    },
    originalPrice: {
        color: '#000',
        textDecorationLine: 'line-through',
    },
    removeButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 7,
    },
    removeButton: {
        backgroundColor: '#F7F7F7',
        padding: 2,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
    },
    quantityButton: {
        paddingHorizontal: 10,
        borderColor: '#CCC',
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 10,
    },
    noCotainer: {
        backgroundColor: '#ffe69c',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    noText: {
        fontSize: 16
    }
});

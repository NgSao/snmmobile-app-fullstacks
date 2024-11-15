import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../redux/CartReducer';
import Toast from 'react-native-toast-message';
import { addToWishList } from '../redux/WishListReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST_ADD } from '../api/apiService';
import { useNavigation } from 'expo-router';

const BottomTab = ({ product }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const [addedToWishList, setAddedToWishListt] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    // console.log("giỏ hàng", cart)

    const wishList = useSelector((state) => state.wishlist.wishlist);
    const addToWishListStatus = useSelector((state) => state.wishlist.addToWishListStatus);

    // console.log("Yêu thích", wishList)

    const addItemToWishList = (item) => {
        setAddedToWishListt(true);
        dispatch(addToWishList(item));
        if (addToWishListStatus === true) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Thêm thành công ${item.name} ${item.size} vào yêu thích`,
                type: 'success',
                position: 'top',
            });
        } else if (addToWishListStatus === false) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Sản phẩm ${item.name} ${item.size} đã có trong yêu thích`,
                type: 'error',
                position: 'top',
            });
        }
        setTimeout(() => {
            setAddedToWishListt(false);
        }, 15000);
    };

    // Xử lý thêm 
    const flag = true;
    const addItemToCart = async (item) => {
        try {
            setAddedToCart(true);
            if (flag) {
                dispatch(addToCart({
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



            // Lưu vào csdl
            const token = await AsyncStorage.getItem("authToken", token);
            const userId = await AsyncStorage.getItem("userId", userId);
            if (token) {
                const data = {
                    cartId: userId,
                    colorId: item.colorId,
                    quantity: 1
                }
                await POST_ADD("carts", data)
            }
            Toast.show({
                text1: 'Thông báo',
                text2: `Thêm thành công ${item.name} ${item.size} vào giỏ hàng`,
                type: 'success',
                position: 'top',
            });
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


        setTimeout(() => {
            setAddedToCart(false);
        }, 30000);
    };

    const handleChat = () => {
        navigation.navigate('Chat');
    }

    return (
        <View style={{ paddingTop: 10, backgroundColor: '#FFF', justifyContent: 'flex-end' }} >
            <View style={styles.containerTab}>
                <TouchableOpacity style={styles.tabBgIcon} onPress={handleChat}>
                    <Icon name="comment" style={styles.tabIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBg} onPress={() => addItemToCart(product)}>
                    {addedToCart ? (
                        <Text style={styles.tabText}>Giỏ hàng</Text>
                    ) : (
                        <Text style={styles.tabText}>Mua hàng</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBg1} onPress={() => addItemToWishList(product)}>
                    {addedToWishList ? (
                        <Text style={styles.tabText}>Đã Thêm</Text>
                    ) : (
                        <Text style={styles.tabText}>Yêu thích</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default BottomTab

const styles = StyleSheet.create({
    // TabICon
    containerTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,

    },
    tabBgIcon: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d70018"
    },

    tabIcon: {
        color: "#d70018",
        fontSize: 18,
        padding: 5,
        paddingHorizontal: 10
    },
    tabBg: {
        backgroundColor: "#d70018",
        borderRadius: 25,

    },
    tabBg1: {
        backgroundColor: 'blue',
        borderRadius: 25,
    },
    tabText: {
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        paddingHorizontal: 35,
        fontWeight: 'bold'
    }
})
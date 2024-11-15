import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import CartItem from '../components/cart/CartItem';
import { ScrollView } from 'react-native-virtualized-view';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderItem } from './../redux/OrderReducer';
import { cleanCart } from '../redux/CartReducer';
import Toast from 'react-native-toast-message';
import { formatCurrency } from '../utils/utils';

const CartScreen = () => {
    const navigation = useNavigation();
    const [total, setTotal] = useState(0);
    const handleTotalChange = (newTotal) => {
        setTotal(newTotal);
    };
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    console.log("Cart", cart);
    const handleOrderInfo = () => {
        if (cart.length > 0) {
            navigation.navigate('OrderScreen');
            dispatch(createOrderItem(cart));
            // dispatch(cleanCart(cart));
        } else {
            Toast.show({
                text1: 'Thông báo',
                text2: `Vui lòng thêm sản phẩm vào giỏ hàng!`,
                type: 'error',
                position: 'top',
            });
        }

    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.containerText}>Đơn hàng của bạn</Text>

                    <CartItem onTotalChange={handleTotalChange} />

                    {/* <View style={styles.discountCode}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', borderColor: '#CCC', borderWidth: 1, padding: 15, borderRadius: 10 }}>
                            <TextInput placeholder="Nhập mã giảm giá(nếu có)" placeholderTextColor="#888" />
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ paddingRight: 5, color: "#d70018" }}>Áp dụng</Text>
                                <Icon name="ticket" style={{ fontSize: 20, color: "#d70018" }} />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </View>
            </ScrollView>

            <View style={{ padding: 10, backgroundColor: '#FFF' }} >
                <View style={styles.containerTab}>
                    <View>
                        <Text>Tạm tính:</Text>
                        <Text style={{ color: "#d70018", fontWeight: 'bold', fontSize: 18 }}>{formatCurrency(total)} </Text>
                    </View>
                    <TouchableOpacity style={styles.tabBg} onPress={handleOrderInfo}>
                        <Text style={styles.tabText}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginHorizontal: 10,
    },
    containerText: {
        fontSize: 22,
        color: '#d70018',
        fontWeight: '600',
        padding: 5
    },



    containerTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    tabBg: {
        backgroundColor: "#d70018",
        borderRadius: 25,

    },
    tabText: {
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        paddingHorizontal: 35,
        fontWeight: 'bold'
    },
    discountCode: {
        marginTop: 10
    }
});
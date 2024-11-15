import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/utils';

const InfoItemOrder = () => {
    const orderInfo = useSelector((state) => state.order.orderInfo);
    const orderItem = useSelector((state) => state.order.order);

    const total = orderItem.map((item) => (item.price - (item.price * item.discount / 100)) * item.quantity).reduce((curr, prev) => curr + prev, 0);

    const shipFree = orderInfo.selectedShop !== null || orderInfo.provinceName === "Hồ Chí Minh" ? 0 : 50000;
    console.log(total)
    return (
        <View style={styles.paymentHeader}>
            <View style={styles.headerTitle}>
                {/* <Image source={require('../assets/images/order/delivery.png')} style={{ width: 20, height: 20 }} /> */}
                <Text style={{ fontSize: 20, color: '#FFF', fontWeight: 'bold', paddingLeft: 5 }}>Thông tin đơn hàng</Text>
            </View>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/order/bagsorder.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text>Tổng tiền sản phẩm:</Text>
                <Text>{formatCurrency(total)}</Text>
            </View>
            {orderInfo.selectedShop !== null ? (
                <>
                </>
            ) : (
                <>
                    {orderInfo.provinceName !== "Chưa có thông tin" || orderInfo.provinceName !== "Hồ Chí Minh" ? (
                        <View style={styles.headerContainer}>
                            <Image source={require('../assets/images/order/shpping.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                            <Text>Phí vận chuyển: </Text>
                            <Text style={{ marginLeft: 5 }}>{formatCurrency(shipFree)}</Text>
                        </View>
                    ) : (
                        <View style={styles.headerContainer}>
                            <Image source={require('../assets/images/order/shpping.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                            <Text>Phí vận chuyển: </Text>
                            <Text style={{ marginLeft: 5 }}>Free Ship<Text style={{ color: 'blue', fontWeight: '300' }}> (Nội thành giao 24 giờ)</Text></Text>
                        </View>
                    )}
                </>
            )}

            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/order/coupon.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text>Mã giảm giá:</Text>
                <Text style={{ marginLeft: 5 }}>Không có</Text>
            </View>
            {orderInfo.screenSupport !== "" ? (
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/images/order/question.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                    <Text>Tùy chọn: </Text>
                    <Text>{orderInfo?.screenSupport}</Text>
                </View>
            ) : (
                <></>
            )}

            <View>
                {/* <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/images/order/gift.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text>Quà tặng:</Text>
            </View>
            <Promotions /> */}
                {orderInfo.provinceName !== "Chưa có thông tin" || orderInfo.provinceName !== "Hồ Chí Minh" ? (
                    <View style={styles.headerContainer}>
                        <Image source={require('../assets/images/order/paymrny.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                        <Text style={{ fontSize: 16 }}>Tổng tiền đơn hàng: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{formatCurrency(total + shipFree)}</Text>
                    </View>
                ) :
                    (
                        <View style={styles.headerContainer}>
                            <Image source={require('../assets/images/order/paymrny.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
                            <Text style={{ fontSize: 16 }}>Tổng tiền đơn hàng: </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{formatCurrency(total)}</Text>
                        </View>)}

            </View>
        </View>
    )
}

export default InfoItemOrder
const styles = StyleSheet.create({
    paymentHeader: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 30,
    },
    headerTitle: {
        backgroundColor: '#d70018',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginHorizontal: 40,
        marginBottom: 10
    },
    headerContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
})
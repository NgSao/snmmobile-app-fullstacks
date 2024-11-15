import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GET_ID } from '../api/apiService';
import { formatIsoDate } from '../utils/utils';
import { formatCurrency } from './../utils/utils';

const InfoItemSuccess = () => {
    const orderItem = useSelector((state) => state.order.order);
    const orderInfo = useSelector((state) => state.order.orderInfo);

    const shipFree = 50000;
    const total = orderItem.map((item) => (item.price - (item.price * item.discount / 100)) * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const totalShip = orderInfo.provinceName !== "Chưa có thông tin" || orderInfo.provinceName !== "Hồ Chí Minh" ? total + shipFree : total

    const [orderNew, setOrderNew] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await GET_ID("orders/orderCode", orderInfo.orderCode);
                setOrderNew(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);

            }
        };
        fetchOrders();
    }, [orderInfo.orderCode]);
    console.log("ss", orderNew);
    const renderItem = ({ item }) => {
        return (
            <View key={item.colorId} style={styles.cartItem}>
                <View style={styles.itemContainer} >
                    <Image style={styles.image} source={{ uri: item.colors[0].imageUrl }} resizeMode="contain" />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name} {item.size}</Text>
                        <Text>Màu:<Text>{item.colors[0].color}</Text></Text>
                        <Text>Số lượng: <Text>{item.quantity}</Text></Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#d70018', paddingBottom: 5 }}>Thông tin đơn hàng</Text>
            <Text style={{ paddingBottom: 5 }}>Mã đơn hàng: <Text style={{ fontWeight: 'bold' }}>{orderInfo.orderCode}</Text></Text>
            {orderNew && (
                <Text style={{ paddingBottom: 5 }}>Ngày đặt hàng: <Text>{formatIsoDate(orderNew.createdAt)}</Text></Text>
            )}
            <Text style={{ paddingBottom: 5 }}>Trạng thái: <Text style={{ fontWeight: 'bold', color: 'blue', fontWeight: '400' }}>Giao dịch đang xử lý/kiểm tra</Text></Text>

            <FlatList
                data={orderItem}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem} />

            <View style={styles.mainTotal}>
                <View style={styles.totalItem}>
                    <Text style={styles.totalText}>Tổng tiền sản phẩm:</Text>
                    <Text style={styles.totalText}>{formatCurrency(total)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15
                }}>
                    <Text style={styles.totalText}>Phí vận chuyển:</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        {
                            orderInfo.provinceName !== "Chưa có thông tin" || orderInfo.provinceName !== "Hồ Chí Minh" ? (
                                <>
                                    <Text style={styles.totalText}>+{formatCurrency(shipFree)}</Text>
                                    <Text style={{ fontSize: 10, color: 'blue' }}>(Phí vận chuyển đã bao gồm bảo hiểm)</Text>
                                </>
                            ) : (
                                <Text style={styles.totalText}>0 đ</Text>
                            )
                        }

                    </View>
                </View>
                <View style={styles.totalItem}>
                    <Text style={styles.totalTextTotal}>Tổng tiền đơn hàng:</Text>
                    <Text style={styles.totalTextTotal}>{formatCurrency(totalShip)}</Text>
                </View>
            </View>
        </View>
    )
}

export default InfoItemSuccess

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
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
    mainTotal: {
        borderTopColor: '#000',
        borderTopWidth: 1,
        paddingTop: 15,
        marginBottom: 10
    },
    totalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center'
    },
    totalText: {
        fontSize: 16
    },
    totalTextTotal: {
        fontSize: 16,
        color: '#d70018',
        fontWeight: 'bold'
    },

})
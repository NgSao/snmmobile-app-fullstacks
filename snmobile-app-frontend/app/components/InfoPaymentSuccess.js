import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { formatCurrency } from './../utils/utils';
import { GET_ID } from '../api/apiService';

const InfoPaymentSuccess = ({ orderCode }) => {
    const orderInfo = useSelector((state) => state.order.orderInfo);
    const orderItem = useSelector((state) => state.order.order);
    const [payment, setPayment] = useState(null);

    const shipFree = 50000;
    const total = orderItem.map((item) => (item.price - (item.price * item.discount / 100)) * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const totalShip = orderInfo.provinceName !== "Chưa có thông tin" || orderInfo.provinceName !== "Hồ Chí Minh" ? total + shipFree : total
    const currentDate = new Date();
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')} ${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await GET_ID("payment", orderCode);
                setPayment(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPayment();
    }, [orderCode]);


    console.log("thanhtoan", payment);

    return (
        <>
            <View style={styles.paymentHeader}>
                <View style={styles.headerTitle}>
                    <Text style={{ fontSize: 20, color: '#FFF', fontWeight: 'bold', paddingLeft: 5 }}>Thông tin thanh toán</Text>
                </View>
                <View style={styles.headerFooter}>
                    {payment ? (
                        <>
                            <Text style={{ paddingTop: 5 }}>
                                Hình thức: <Text style={{ fontWeight: 'bold', color: '#d70018' }}>
                                    Thanh toán bằng {payment.method}
                                </Text>
                            </Text>
                            <Text style={{ paddingTop: 5 }}>
                                Thời gian: <Text style={{ fontWeight: 'bold' }}>{payment.time}</Text>
                            </Text>
                            <Text style={{ paddingTop: 5 }}>
                                Số tiền: <Text style={{ fontWeight: 'bold' }}>{formatCurrency(totalShip)}</Text>
                            </Text>
                            <Text style={{ paddingTop: 5 }}>Trạng thái: <Text style={{ fontWeight: 'bold' }}>Chờ xử lý</Text></Text>
                        </>
                    ) : (
                        <Text>Đang tải thông tin thanh toán...</Text>
                    )}
                </View>
            </View>


        </>
    )
}

export default InfoPaymentSuccess

const styles = StyleSheet.create({
    paymentHeader: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
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
        marginHorizontal: 30,
        marginBottom: 10
    },
    headerContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    headerMain: {
        flexDirection: 'row',
        marginVertical: 5,
        width: '60%',
    },
})
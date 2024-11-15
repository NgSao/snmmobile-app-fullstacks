import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { GET_ID } from '../api/apiService';

const InfoCustommerOrder = ({ orderInfoHistory, flagHistory }) => {

    const orderInfo = flagHistory ? orderInfoHistory : useSelector((state) => state.order.orderInfo);
    console.log("orderss", orderInfo);
    const [shops, setShops] = useState([]);
    const [flag, setFlag] = useState(null);
    const [flagShop, setFlagShop] = useState(null);

    useEffect(() => {
        if (orderInfo) {
            setFlagShop(flagHistory ? orderInfo.shopId : orderInfo.selectedShop);
        }
    }, [orderInfo, flagHistory]);

    useEffect(() => {
        if (flagShop) {
            const fetchShop = async () => {
                try {
                    const response = await GET_ID('shops', flagShop);
                    setShops(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchShop();
        }
    }, [flagShop]);

    console.log('shop', shops);
    return (
        <View style={styles.paymentHeader}>
            <View style={styles.headerTitle}>
                <Text style={{ fontSize: 20, color: '#FFF', fontWeight: 'bold', paddingLeft: 5 }}>Thông tin khách hàng</Text>
            </View>
            {flagShop == flag ? (
                <>
                    <View style={styles.headerMain}>
                        <Icon name="user-circle" size={20} style={{ marginRight: 5 }} />
                        <Text>Người nhận:</Text>
                        <Text>{orderInfo?.name}</Text>
                    </View>
                    <View style={styles.headerMain}>
                        <Icon name="phone-alt" size={20} style={{ marginRight: 5 }} />
                        <Text>Số điện thoại: </Text>
                        <Text>{orderInfo?.phone}</Text>
                    </View>
                    <View style={styles.headerMain}>
                        <Icon name="envelope" size={20} style={{ marginRight: 5 }} />
                        <Text>Email: </Text>
                        <Text>{orderInfo?.email}</Text>
                    </View>
                    {!flagHistory && orderInfo.provinceName !== "Chưa có thông tin" ? (
                        <View style={styles.headerMain}>
                            <Icon name="location-arrow" size={20} style={{ marginRight: 5 }} />
                            <Text>Địa chỉ nhận hàng: </Text>
                            <Text>{`${orderInfo?.address}, ${orderInfo?.wardName}, ${orderInfo?.districtName}, ${orderInfo?.provinceName}`}</Text>
                        </View>
                    ) : (
                        flagHistory && orderInfo.address === orderInfo.address && (
                            <View style={styles.headerMain}>
                                <Icon name="location-arrow" size={20} style={{ marginRight: 5 }} />
                                <Text>Địa chỉ nhận hàng: </Text>
                                <Text>{orderInfo.address}</Text>
                            </View>
                        )
                    )}

                </>
            ) : (
                <>
                    <View style={styles.headerMain}>
                        <Icon name="user-circle" size={20} style={{ marginRight: 5 }} />
                        <Text>Người đặt:</Text>
                        <Text>{orderInfo?.name}</Text>
                    </View>
                    <View style={styles.headerMain}>
                        <Icon name="phone-alt" size={20} style={{ marginRight: 5 }} />
                        <Text>Số điện thoại: </Text>
                        <Text>{orderInfo?.phone}</Text>
                    </View>
                    <View style={styles.headerMain}>
                        <Icon name="envelope" size={20} style={{ marginRight: 5 }} />
                        <Text>Email: </Text>
                        <Text>{orderInfo?.email}</Text>
                    </View>
                    <View style={styles.headerMain}>
                        <Icon name="location-arrow" size={20} style={{ marginRight: 5 }} />
                        <Text>Nhận tại cửa hàng: </Text>
                        <Text>{shops.name} - {shops.address}</Text>
                    </View>

                </>
            )}

            <View style={styles.headerMain}>
                <Icon name="pencil-alt" size={20} style={{ marginRight: 5 }} />
                <Text>Ghi chú: </Text>
                <Text>{orderInfo?.note || 'Không có ghi chú'}</Text>
            </View>
            {!flagHistory ? (
                <>
                    {orderInfo.otherReceiverName === "" ? (
                        <>
                        </>
                    ) : (
                        <>
                            <View style={styles.headerMain}>
                                <Icon name="user-circle" size={20} style={{ marginRight: 5 }} />
                                <Text>Người nhận hộ:</Text>
                                <Text>{orderInfo?.otherReceiverName}</Text>
                            </View>
                            <View style={styles.headerMain}>
                                <Icon name="phone-alt" size={20} style={{ marginRight: 5 }} />
                                <Text>Số điện thoại: </Text>
                                <Text>{orderInfo?.otherReceiverPhone}</Text>
                            </View>
                        </>
                    )}
                </>
            ) : (
                <>
                    {orderInfo.nameOther === "" ? (
                        <>
                        </>
                    ) : (
                        <>
                            <View style={styles.headerMain}>
                                <Icon name="user-circle" size={20} style={{ marginRight: 5 }} />
                                <Text>Người nhận hộ:</Text>
                                <Text>{orderInfo?.nameOther}</Text>
                            </View>
                            <View style={styles.headerMain}>
                                <Icon name="phone-alt" size={20} style={{ marginRight: 5 }} />
                                <Text>Số điện thoại: </Text>
                                <Text>{orderInfo?.phoneOther}</Text>
                            </View>
                        </>
                    )}
                </>
            )}
        </View>
    )
}

export default InfoCustommerOrder
const styles = StyleSheet.create({
    paymentContainer: {
        padding: 10
    },
    paymentHeader: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 30,
        overflow: 'hidden'
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

    headerMain: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '65%',
        paddingRight: 1
    },
    tabBg: {
        backgroundColor: '#d70018',
        borderRadius: 25,
        paddingHorizontal: 35,
        margin: 30

    },
    tabText: {
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },

})
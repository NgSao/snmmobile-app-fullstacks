
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ID } from '../api/apiService';
import InfoCustommerOrder from '../components/InfoCustommerOrder';
import { formatCurrency, formatIsoDate } from './../utils/utils';

const OrderList = ({ orders }) => {
    const [showDetails, setShowDetails] = useState({});
    const status = [
        {
            id: "1",
            name: "Chờ xác nhận",
        },
        {
            id: "2",
            name: "Đã xác nhận",
        },
        {
            id: "3",
            name: "Đã giao",
        },
        {
            id: "4",
            name: "Đã hủy",
        }
    ]

    const renderOrderItem = ({ item }) => {
        return (
            <View style={styles.cartItem}>
                <View style={styles.itemContainer}>
                    <Image style={styles.image} source={{ uri: item.colorImage }} resizeMode="contain" />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.productName} {item.stockSize}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ paddingRight: 15 }}>Số lượng:</Text>
                            <Text>{item.quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ paddingRight: 50 }}>Giá:</Text>
                            <Text>{formatCurrency(item.price)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        const currentStatus = status.find(statusItem => statusItem.id === item.status.toString());
        const orderDate = new Date(item.createdAt);
        const estimatedDeliveryDate = new Date(orderDate);
        estimatedDeliveryDate.setDate(orderDate.getDate() + 3);
        const quantity = item.orderDetails.reduce((acc, item) => acc + item.quantity, 0);
        const total = item.orderDetails.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
        const ship = item.total - total;
        console.log(item.total);
        const toggleDetails = () => {
            setShowDetails(prevState => ({
                ...prevState,
                [item.id]: !prevState[item.id]
            }));
        };
        return (
            <View style={styles.firstContainer}>
                <View style={styles.firstTitle}>
                    <Text>Đơn hàng: <Text>{item.orderCode}</Text></Text>
                    <Text style={{ color: '#198754' }}>
                        {currentStatus ? currentStatus.name : 'Không xác định'}
                    </Text>
                </View>
                <View style={styles.firstDate}>
                    <Text>Ngày đặt hàng: {formatIsoDate(item.createdAt)}</Text>
                    <Text style={{ color: '#d70018', fontWeight: '300', paddingTop: 5 }}>
                        Dự kiến giao: {estimatedDeliveryDate.toLocaleDateString()}
                    </Text>
                </View>
                <FlatList
                    data={item.orderDetails}
                    renderItem={renderOrderItem}
                    keyExtractor={(orderItem) => orderItem.id.toString()} />
                <View style={styles.firstFooter}>
                    <View style={styles.firstItem}>
                        <Text>Tổng đơn hàng</Text>
                        <Text>{formatCurrency(total)}</Text>
                    </View>
                    <View style={styles.firstItem}>
                        <Text>Số lượng:</Text>
                        <Text >{quantity}</Text>
                    </View>

                    <View style={styles.firstItem}>
                        <Text>Phí vận chuyển:</Text>
                        <Text >{formatCurrency(ship)}</Text>
                    </View>

                    <View style={styles.firstItem}>
                        <Text>Mã giảm giá/ưu đãi:</Text>
                        <Text>-</Text>
                    </View>
                    <View style={styles.firstItem}>
                        <Text style={{ color: '#d70018', fontWeight: 'bold' }}>Tổng tiền đơn hàng:</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#d70018', fontWeight: 'bold' }}>{formatCurrency(item.total)}</Text>

                            <TouchableOpacity style={styles.historyDetail} onPress={toggleDetails}>
                                <Text style={{ color: '#d70018' }}>Chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {showDetails[item.id] && (
                    <InfoCustommerOrder orderInfoHistory={item.orderCustommers} flagHistory={true} />
                )}
            </View>
        )
    }




    if (orders.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: '#CCC' }}>
                <View style={styles.noCotainer}>
                    <Text style={styles.noText}>Không tìm thấy thông tin.</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#CCC' }}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>

    );
};

const FirstRoute = ({ orders }) => <OrderList orders={orders} />;
const SecondRoute = ({ orders }) => <OrderList orders={orders.filter(order => order.status === 1)} />;
const ThirdRoute = ({ orders }) => <OrderList orders={orders.filter(order => order.status === 2)} />;
const FourthRoute = ({ orders }) => <OrderList orders={orders.filter(order => order.status === 3)} />;
const FifthRoute = ({ orders }) => <OrderList orders={orders.filter(order => order.status === 4)} />;

export default function OrderHistoryScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Tất cả' },
        { key: 'second', title: 'Chờ xác nhận' },
        { key: 'third', title: 'Đã xác nhận' },
        { key: 'fourth', title: 'Đã giao' },
        { key: 'fifth', title: 'Đã hủy' },
    ]);

    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchId = async () => {
            const userId = await AsyncStorage.getItem("userId");
            setUserId(userId);
        };
        fetchId();
    }, []);
    console.log(JSON.stringify(orders, null, 2))

    useEffect(() => {
        const fetchOrderHistory = async () => {
            if (userId) {
                try {
                    const response = await GET_ID("orders/user", userId);
                    setOrders(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchOrderHistory();
    }, [userId]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstRoute orders={orders} />;
            case 'second':
                return <SecondRoute orders={orders} />;
            case 'third':
                return <ThirdRoute orders={orders} />;
            case 'fourth':
                return <FourthRoute orders={orders} />;
            case 'fifth':
                return <FifthRoute orders={orders} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.historyTitle}>Lịch sử mua hàng</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: '#d70018' }}
                        style={{ backgroundColor: '#FFF' }}
                        labelStyle={{
                            fontSize: 10,
                            color: '#000',
                            fontWeight: 'bold'
                        }}
                    />
                )}
                style={styles.tabView}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    header: {
        alignItems: 'center',
        margin: 20,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d70018',
    },
    tabView: {
        flex: 1,
    },
    firstContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        marginBottom: 20
    },
    firstTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5
    },
    firstDate: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
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
    firstFooter: {
        marginTop: 20,
        marginBottom: 20
    },
    firstItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 7
    },
    historyDetail: {
        padding: 5,
        paddingHorizontal: 15,
        borderColor: '#d70018',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 5
    },
    paymentHeader: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10
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
    headerMain: {
        flexDirection: 'row',
        marginVertical: 5,
        width: '60%',
    },
    noCotainer: {
        backgroundColor: '#ffe69c',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    noText: {
        fontSize: 16
    }


});

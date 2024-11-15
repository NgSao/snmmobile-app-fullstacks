import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Promotions from './../promotions/Promotions';
import InfoItemOrder from './../InfoItemOrder';
import InfoCustommerOrder from '../InfoCustommerOrder';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanCart } from './../../redux/CartReducer';
import { DELETE_ID, POST_ADD } from '../../api/apiService';
import LottieView from 'lottie-react-native';

const OrderPayment = ({ setCurrentStep }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('0');
    const [userId, setUserId] = useState(null);
    const [flag, setFlag] = useState(null);
    const handleFlagChange = (newFlag) => {
        setFlag(newFlag);
    };
    console.log("nosnef", flag);


    const radioButtons = [
        {
            id: '1',
            label: 'Thanh toán bằng tiền mặt',
            imageUrl: require('../../assets/images/payment/home.jpg'),
        },
        {
            id: '2',
            label: 'Thanh toán VNPAY',
            imageUrl: require('../../assets/images/payment/vnpay.jpg'),
        },
        {
            id: '3',
            label: 'Thanh toán PAYPAL',
            imageUrl: require('../../assets/images/payment/paypal.png'),
        },
        {
            id: '4',
            label: 'Thanh toán ZALOPAY',
            imageUrl: require('../../assets/images/payment/zalo.jpeg'),
        },
        {
            id: '5',
            label: 'Thanh toán MOMO',
            imageUrl: require('../../assets/images/payment/momo.png'),
        },

    ];

    const handlePress = (id) => {
        setSelectedId(id);
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.radioButtonContainer,
                selectedId === item.id && styles.selectedRadioButton]}
            onPress={() => handlePress(item.id)}
        >
            <Image source={item.imageUrl} style={styles.image} />
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.radioButton}>
                {selectedId === item.id && <View style={styles.radioButtonInner} />}
            </View>
        </TouchableOpacity>
    );


    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const order = useSelector((state) => state.order.order);
    // console.log("ordernè", JSON.stringify(order, null, 2));

    const orderInfo = useSelector((state) => state.order.orderInfo);
    // console.log("orderss", orderInfo);
    // console.log("ssaa", orderInfo.shopName);
    const total = order.map((item) => (item.price - (item.price * item.discount / 100)) * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const shipFree = orderInfo.selectedShop !== null || orderInfo.provinceName === "Hồ Chí Minh" ? 0 + total : 50000 + total;

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            setUserId(storedUserId);
        }
        fetchUserId();
    }, []);

    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };

    console.log("flaeenef", flag);
    const handleContinue = async () => {
        if (selectedId == '2' && flag !== true) {
            navigation.navigate('VnPay', { onFlagChange: handleFlagChange, shipFree: shipFree });
            return;
        }
        if (selectedId == '3' && flag !== true) {
            navigation.navigate('PayPal', { onFlagChange: handleFlagChange, shipFree: shipFree });
            return;
        }
        if (selectedId == '4' && flag !== true) {
            navigation.navigate('ZaloPay', { onFlagChange: handleFlagChange, shipFree: shipFree });
            return;
        }
        if (selectedId == '5' && flag !== true) {
            navigation.navigate('MoMo', { onFlagChange: handleFlagChange, shipFree: shipFree });
            return;
        }
        if (selectedId == '1' || selectedId == '2' || selectedId == '3' || selectedId == '4' || selectedId == '5' || flag !== false) {
            const finalUserId = userId ? userId : -1;
            if (selectedId === '0') {
                Toast.show({
                    text1: 'Thông báo',
                    text2: `Vui lòng chọn phương thức thanh toán!`,
                    type: 'error',
                    position: 'top',
                });
                return;
            }

            const orderDetailDTOs = order.map(item => ({
                quantity: item.quantity,
                price: calculateDiscountedPrice(item.price, item.discount),
                colorId: item.colorId,
            }));
            const orderDetailRequests = order.map(item => ({
                productName: `${item.name} ${item.colors[0].color} ${item.size}`,
                quantity: item.quantity,
                price: calculateDiscountedPrice(item.price, item.discount),
                imageUrl: item.colors[0].imageUrl,
            }))

            const data = {
                userId: finalUserId,
                orderCode: orderInfo.orderCode,
                total: shipFree,
                support: orderInfo.email,
                orderCustommerDTO: {
                    name: orderInfo.name,
                    address: `${orderInfo.address}, ${orderInfo.wardName}, ${orderInfo.districtName}, ${orderInfo.provinceName}`,
                    note: orderInfo.note,
                    phone: orderInfo.phone,
                    email: orderInfo.email,
                    nameOther: orderInfo.otherReceiverName,
                    phoneOther: orderInfo.otherReceiverPhone,
                    shopId: orderInfo.selectedShop ? orderInfo.selectedShop : -1
                },
                orderDetailDTOs: orderDetailDTOs,
                paymentDTO: {
                    method: selectedId === '1' ? 'COD' : selectedId === '3' ? 'PAYPAL' : selectedId === '4' ? 'ZALOPAY' : selectedId == '2' ? 'VNPAY' : 'MOMO',
                    status: 1
                }
            };

            const dataEmail = {
                userEmail: orderInfo.email,
                orderCode: orderInfo.orderCode,
                total: shipFree,
                customerName: orderInfo.name,
                customerAddress: `${orderInfo.address}, ${orderInfo.wardName}, ${orderInfo.districtName}, ${orderInfo.provinceName}`,
                customerPhone: orderInfo.phone,
                otherName: orderInfo.otherReceiverName,
                otherPhone: orderInfo.otherReceiverPhone,
                shopName: orderInfo.nameShop,
                note: orderInfo.note,
                orderDetailRequests: orderDetailRequests
            }
            setLoading(true);
            try {
                const orderPromise = POST_ADD("orders", data);
                const emailPromise = POST_ADD("email/success", dataEmail);

                await Promise.all([orderPromise, emailPromise]);
                dispatch(cleanCart(cart));
                if (userId) {
                    await DELETE_ID('carts/user', userId);
                }
                setLoading(false);
                setCurrentStep(3);
            }
            catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => setCurrentStep(1)}>
                        <Icon name="arrow-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{ padding: 10, fontSize: 24 }}>Thông tin thanh toán</Text>
                </Pressable>
                <View style={styles.paymentContainer}>
                    <InfoItemOrder />
                    <InfoCustommerOrder />
                    <View style={styles.paymentFooter}>
                        <Text style={{ fontSize: 18, padding: 10 }}>Hình thức thanh toán</Text>
                        <FlatList
                            data={radioButtons}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    {loading ? (
                        <LottieView
                            source={require('../../assets/animation/thanhtoan.json')}
                            autoPlay
                            loop
                            style={styles.loadingAnimation}
                        />
                    ) : (
                        <TouchableOpacity style={styles.tabBg} onPress={handleContinue}>
                            <Text style={styles.tabText}>Thanh toán</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderPayment

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
    headerMain: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '60%',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 5,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        marginHorizontal: 10,
        backgroundColor: '#FFF'
    },
    selectedRadioButton: {
        borderColor: 'blue',
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'blue',
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
    loadingAnimation: {
        width: 300,
        height: 300,
        marginTop: 180,
        alignSelf: 'center',
        position: 'absolute',
    },
})
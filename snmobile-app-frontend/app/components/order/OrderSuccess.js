import { SafeAreaView, StyleSheet, Text, View, Image, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import InfoCustommerOrder from '../InfoCustommerOrder';
import InfoItemSuccess from '../InfoItemSuccess';
import InfoPaymentSuccess from '../InfoPaymentSuccess';
import { ScrollView } from 'react-native-virtualized-view';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder } from '../../redux/OrderReducer';

const OrderSuccess = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const order = useSelector((state) => state.cart.order);
    const orderInfo = useSelector((state) => state.order.orderInfo);
    console.log("sss", orderInfo.orderCode);



    const handleHome = () => {
        navigation.replace('Main');
        dispatch(clearOrder(order));
        Toast.show({
            text1: 'Thông báo',
            text2: `Cảm ơn bạn đã mua hàng!`,
            type: 'success',
            position: 'top',
        });

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={styles.successHeader}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>Đặt hàng thành công</Text>
                        <Text style={{ paddingBottom: 5 }}>Đơn hàng đã đặt thành công.</Text>
                        <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                            <Text>Cảm ơn Quý khách đã mua hàng tại </Text>
                            <TouchableOpacity onPress={() => navigation.replace('Home')}>
                                <Text style={{ color: '#d70018' }}>SN Mobile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Nếu Quý khách có bất kỳ thắc mắc gì, xin vui lòng liên hệ với hotline: </Text>
                            <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: '48%' }} onPress={() => { Linking.openURL('tel:0392445255'); }} >
                                <Text style={{ color: '#d70018' }}>0392445255</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sucessMain}>
                        <InfoItemSuccess />
                        <InfoCustommerOrder />
                        <InfoPaymentSuccess orderCode={orderInfo.orderCode} />
                        <TouchableOpacity style={styles.tabBg1} onPress={() => navigation.replace('Home')}>
                            <Text style={styles.tabText}>Kiểm tra đơn hàng</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabBg} onPress={handleHome}>
                            <Text style={styles.tabText}>Trang chủ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView >
    )
}

export default OrderSuccess

const styles = StyleSheet.create({
    successHeader: {
        padding: 10,
        backgroundColor: '#d1e7dd',
        margin: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    sucessMain: {
        padding: 10,
        backgroundColor: '#FFF',
        margin: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingBottom: 30
    },



    tabBg: {
        backgroundColor: '#d70018',
        borderRadius: 10,
        paddingHorizontal: 35,
        marginTop: 20
    },
    tabBg1: {
        backgroundColor: '#FF7D05',
        borderRadius: 10,
        paddingHorizontal: 35,
        marginTop: 20
    },

    tabText: {
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})
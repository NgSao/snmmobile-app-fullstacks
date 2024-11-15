import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { GET_ID, POST_ADD } from '../../api/apiService';
import { useNavigation } from '@react-navigation/native';

const Momo = ({ route }) => {
    const { shipFree } = route.params;
    const { onFlagChange } = route.params;
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasCheckedStatus, setHasCheckedStatus] = useState(false);
    const navigation = useNavigation();

    const createPayment = async () => {
        try {
            const response = await POST_ADD('momo', { amount: shipFree });
            setPaymentUrl(response.data.payUrl);
            console.log(paymentUrl);
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating payment:', error);
            Alert.alert('Error', 'Không thể tạo URL thanh toán');
        }
    };

    useEffect(() => {
        createPayment();
    }, []);

    const handleNavigationStateChange = async (event) => {
        const { url } = event;
        if (hasCheckedStatus) return;
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const orderId = urlParams.get('orderId');
        if (orderId) {
            try {
                setHasCheckedStatus(true);
                const response = await GET_ID("momo/order-status", orderId);
                if (response.data.resultCode === 0) {
                    Alert.alert("Thanh toán thành công!");
                    onFlagChange(true);
                    navigation.goBack();
                } else {
                    Alert.alert("Thanh toán thất bại. Vui lòng thử lại!");
                    onFlagChange(false);
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Lỗi xác minh trạng thái thanh toán. Vui lòng thử lại!");
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <View>
                    <Button title="Đang tải trang thanh toán..." disabled />
                </View>
            ) : (
                <WebView
                    source={{ uri: paymentUrl }}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            )}
        </View>
    );
};

export default Momo;

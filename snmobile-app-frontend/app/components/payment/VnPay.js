import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { POST_ADD } from '../../api/apiService';
import { useNavigation } from '@react-navigation/native';

const VnPay = ({ route }) => {
    const { shipFree } = route.params;
    const { onFlagChange } = route.params;

    const [paymentUrl, setPaymentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const createPayment = async () => {
        try {
            const response = await POST_ADD('vnpayment', {
                amount: shipFree,
            });

            setPaymentUrl(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating payment:', error);
            Alert.alert('Error', 'Không thể tạo URL thanh toán');
        }
    };

    useEffect(() => {
        createPayment();
    }, []);

    // Xử lý sự kiện khi WebView điều hướng
    const handleNavigationStateChange = (event) => {
        const { url } = event;

        if (url.includes('/return')) {
            const params = new URLSearchParams(url.split('?')[1]);
            const responseCode = params.get('vnp_ResponseCode');


            if (responseCode === '00') {
                onFlagChange(true);
                Alert.alert('Thanh toán thành công!');

            } else {
                onFlagChange(false);
                Alert.alert('Thanh toán không thành công!');

            }
            navigation.goBack();


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
                    source={{ uri: paymentUrl }}  // Sử dụng URL thanh toán tạo ra từ API
                    onNavigationStateChange={handleNavigationStateChange}  // Xử lý điều hướng trong WebView
                />
            )}
        </View>
    );
};

export default VnPay;

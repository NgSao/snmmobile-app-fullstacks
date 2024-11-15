import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { GET_ID, POST_ADD } from '../../api/apiService';
import { useNavigation } from '@react-navigation/native';

const ZaloPay = ({ route }) => {
    const { shipFree } = route.params;
    const { onFlagChange } = route.params;

    const [paymentUrl, setPaymentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasCheckedStatus, setHasCheckedStatus] = useState(false);

    const navigation = useNavigation();

    const createPayment = async () => {
        try {
            const response = await POST_ADD('zalopay', {
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

    const handleNavigationStateChange = async (event) => {
        const { url } = event;

        if (hasCheckedStatus) return;

        const urlParams = new URLSearchParams(url.split('?')[1]);
        const appTransId = urlParams.get('apptransid');
        if (appTransId) {
            try {
                setHasCheckedStatus(true);
                const response = await GET_ID("zalopay/order-status", appTransId);
                if (response.data.return_code === 1) {
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
                    source={{ uri: paymentUrl.order_url }}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            )}
        </View>
    );
};

export default ZaloPay;

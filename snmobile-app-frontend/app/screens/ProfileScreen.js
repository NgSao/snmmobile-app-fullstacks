import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import User from './../components/profile/User';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from './LoginScreen';
import Toast from 'react-native-toast-message';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                setIsLoggedIn(token)
                const userId = await AsyncStorage.getItem("userId");
                setUserId(userId);
            } catch (err) {
                console.log("error message", err);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogOut = async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("name");

        navigation.replace("Main");

    }


    const footerItems = [
        { label: 'Lịch sử mua hàng', icon: 'shipping-fast', route: 'OrderHistory' },
        { label: 'Ưu đãi', icon: 'ticket-alt', route: 'Coupon' },
        { label: 'Thông tin của bạn', icon: 'user', route: 'UserInfoScreen' },
        { label: 'Tổng đài hỗ trợ', icon: 'phone', onPress: () => Linking.openURL('https://zalo.me/0392445255') },
    ];


    if (!isLoggedIn) {
        return (
            <LoginScreen />
        )
    }
    else {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <ScrollView style={styles.container}>
                    <User userId={userId} />
                    <View style={styles.footer}>
                        <Text style={{ textAlign: 'center', fontSize: 22, color: "#d70018", fontWeight: 'bold', padding: 10 }}>Tài khoản của tôi</Text>
                        <View style={styles.footerContainer}>
                            {footerItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.footerMain}
                                    onPress={item.route ? () => navigation.navigate(item.route) : item.onPress} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {item.icon && <Icon name={item.icon} size={25} />}
                                        <Text style={{ paddingLeft: item.icon ? 10 : 5 }}>{item.label}</Text>
                                    </View>
                                    <Icon name="angle-right" size={20} />
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.footerLogout} onPress={handleLogOut}>
                                <Text style={{ padding: 8, fontSize: 18, color: '#FFF', fontWeight: 'bold' }}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#DF2121',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        alignItems: 'center',

    },
    avatar: {
        height: '100%',
        width: '100%',
    },
    containerRank: {
        width: 40,
        height: 40,
        alignItems: 'center',
    },
    headerMain: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#CCC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84


    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        marginTop: 10,
    },
    footerContainer: {
        marginHorizontal: 10
    },
    footerMain: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 10,
        marginTop: 10
    },

    footerLogout: {
        marginTop: 30,
        marginHorizontal: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: "#d70018",
        borderRadius: 20,
        borderColor: '#CCC',
        borderWidth: 1
    }

});

export default ProfileScreen;

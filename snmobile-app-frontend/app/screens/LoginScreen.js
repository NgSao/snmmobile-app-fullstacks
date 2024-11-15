import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { POST_ADD } from './../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [isSecure, setIsSecure] = useState(true);
    const toggleSecureEntry = () => {
        setIsSecure(!isSecure);
    };
    const handleLogin = async () => {
        const user = {
            username: username,
            password: password,
        };
        console.log(user);
        if (!username || !password) {
            Toast.show({
                text1: 'Đăng nhập thất bại',
                text2: 'Vui lòng không được để trống.',
                type: 'error',
                position: 'top',
            });
        }
        try {
            const response = await POST_ADD("auth/login", user);
            if (response.status === 200) {
                console.log(response.data);
                const token = response.data.token;
                const userId = response.data.userDTO.id;
                const name = response.data.userDTO.name;
                await AsyncStorage.setItem("authToken", token);
                await AsyncStorage.setItem("userId", userId.toString());
                await AsyncStorage.setItem("name", name);
                Toast.show({
                    text1: 'Đăng nhập thành công',
                    text2: `Chào mừng ${name}!`,
                    type: 'success',
                    position: 'top',
                });
                navigation.replace('Main');

            }
            else {
                Toast.show({
                    text1: 'Đăng nhập thất bại',
                    text2: 'Vui lập nhập lại.',
                    type: 'error',
                    position: 'top',
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 40 }}>
            <View style={styles.contanier}>
                <View style={{
                    flex: 1, marginTop: 40, alignItems: 'center'
                }}>
                    <Image source={require('../assets/images/logo.png')} resizeMode="contain" style={{ height: 100, }} />
                    <Text style={styles.logoText}>Đăng Nhập SN Shop Member</Text>
                </View>
                <View style={{ flex: 2, marginTop: 10 }}>
                    <View >
                        <Text style={styles.inputText}>Số điện thoại của bạn:</Text>
                        <View style={styles.Input}>
                            <Icon name="user" style={styles.icon} />
                            <TextInput value={username} onChangeText={(text) => setUsername(text)} style={styles.nameInput} placeholder="Email hoặc số điện thoại..." placeholderTextColor="#CCC" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputText}>Mật khẩu:</Text>
                        <View style={styles.Input}>
                            <Icon name="lock" style={styles.icon} />
                            <View style={styles.inputContainer}>
                                <TextInput value={password} onChangeText={(text) => setPassword(text)} style={styles.nameInput} placeholder="Mật khẩu của bạn..." placeholderTextColor='#CCC' secureTextEntry={isSecure} />
                                <TouchableOpacity onPress={toggleSecureEntry} >
                                    <Icon name={isSecure ? 'eye-slash' : 'eye'} size={24} color='#CCC' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin} >
                        <Text style={styles.buttonText} >Đăng nhập</Text>
                    </TouchableOpacity>
                    <Text style={styles.textForgot}>Quên mật khẩu?</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around', marginBottom: 50 }}>
                    <TouchableOpacity style={styles.buttonDK} onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.buttonTextDK} >Đăng ký thành viên</Text>
                    </TouchableOpacity>
                    <View style={styles.Icons}>
                        <Icon name="facebook" style={styles.icons} />
                        <Icon name="google" style={styles.icons} />
                        <Icon name="apple" style={styles.icons} />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default LoginScreen


const styles = StyleSheet.create({

    contanier: {
        height: '100%',
        marginTop: 20,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#d70018"

    },
    inputText: {
        fontSize: 18,
        paddingBottom: 10
    },
    Input: {
        borderRadius: 5,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderColor: "#d70018",
        borderWidth: 1,
        marginBottom: 20,
    },
    icon: {
        fontSize: 20,
        paddingRight: 10,
        marginLeft: 10,
        color: '#000'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },
    nameInput: {
        fontSize: 15,
    },
    button: {
        marginTop: 15,
        backgroundColor: "#d70018",
        alignItems: 'center',
        borderRadius: 10
    },
    buttonDK: {
        marginTop: 15,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        padding: 10,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonTextDK: {
        fontSize: 20,
        padding: 10,
        color: "#d70018",
        fontWeight: 'bold'
    },
    textForgot: {
        fontSize: 16,
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
    },


    Icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icons: {
        fontSize: 30,
        color: '#CCC'
    }
})
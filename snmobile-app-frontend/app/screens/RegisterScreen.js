import { Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { POST_ADD } from './../api/apiService';

export default function RegisterScreen({ navigation }) {
    const [isSecure, setIsSecure] = useState(true);
    const toggleSecureEntry = () => setIsSecure(!isSecure);


    const [modalVisible, setModalVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [expectedVerificationCode, setExpectedVerificationCode] = useState("");

    console.log("mã nè", expectedVerificationCode);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (!username || !password || !confirmPassword) {
            Toast.show({
                text1: 'Đăng ký thất bại',
                text2: 'Vui lòng không để trống các trường.',
                type: 'error',
                position: 'top',
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                text1: 'Đăng ký thất bại',
                text2: 'Mật khẩu không khớp.',
                type: 'error',
                position: 'top',
            });
            return;
        }
        const phoneNumber = { phoneNumber: username };
        console.log("phonenef", phoneNumber);

        try {
            const response = await POST_ADD("otp", phoneNumber);
            const verificationCode = response.data.verificationCode;
            setExpectedVerificationCode(verificationCode);
            setModalVisible(true);

        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Gửi mã thất bại',
                text2: 'Vui lòng thử lại.',
                type: 'error',
                position: 'top',
            });
        }
    };


    const handleVerification = async () => {
        if (!verificationCode) {
            Toast.show({
                text1: 'Xác thực thất bại',
                text2: 'Vui lòng nhập mã xác thực.',
                type: 'error',
                position: 'top',
            });
            return;
        }

        if (verificationCode !== expectedVerificationCode) {
            Toast.show({
                text1: 'Xác thực thất bại',
                text2: 'Mã xác thực không đúng.',
                type: 'error',
                position: 'top',
            });
            return;
        }
        const user = {
            name: "Member",
            username: username,
            password: password,
            role: "customer"
        };

        try {
            const response = await POST_ADD("auth/register", user);
            if (response.status === 201) {
                Toast.show({
                    text1: 'Đăng ký thành công',
                    type: 'success',
                    position: 'top',
                });
                navigation.goBack();
            } else {
                Toast.show({
                    text1: 'Đăng ký thất bại',
                    text2: 'Có lỗi xảy ra, vui lòng thử lại.',
                    type: 'error',
                    position: 'top',
                });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Số điện thoại đã có!',
                text2: 'Vui lòng thử lại.',
                type: 'error',
                position: 'top',
            });
        } finally {
            setModalVisible(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 40 }}>
            <View style={styles.container}>
                <Modal transparent={true} visible={modalVisible} animationType="slide">
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Icon name="times" size={24} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Nhập mã xác thực</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Mã xác thực"
                                placeholderTextColor="#CCC"
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                            />
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleVerification}
                            >
                                <Text style={styles.modalButtonText}>Xác thực</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>



                <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image source={require('../assets/images/logo.png')} resizeMode="contain" style={{ height: 100 }} />
                    <Text style={styles.logoText}>Đăng Ký Thành Viên Member</Text>
                </View>
                <View style={{ flex: 3, marginTop: 10 }}>
                    <View>
                        <Text style={styles.inputText}>Nhập số điện thoại của bạn:</Text>
                        <View style={styles.input}>
                            <Icon name="user" style={styles.icon} />
                            <TextInput
                                style={styles.nameInput}
                                placeholder="Email hoặc số điện thoại..."
                                placeholderTextColor="#CCC"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputText}>Mật khẩu:</Text>
                        <View style={styles.input}>
                            <Icon name="lock" style={styles.icon} />
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.nameInput}
                                    placeholder="Mật khẩu của bạn..."
                                    placeholderTextColor="#CCC"
                                    secureTextEntry={isSecure}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={toggleSecureEntry}>
                                    <Icon name={isSecure ? 'eye-slash' : 'eye'} size={24} color='#CCC' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputText}>Nhập lại mật khẩu:</Text>
                        <View style={styles.input}>
                            <Icon name="lock" style={styles.icon} />
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.nameInput}
                                    placeholder="Nhập lại mật khẩu của bạn..."
                                    placeholderTextColor="#CCC"
                                    secureTextEntry={isSecure}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity onPress={toggleSecureEntry}>
                                    <Icon name={isSecure ? 'eye-slash' : 'eye'} size={24} color='#CCC' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Đăng ký thành viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.textForgot}>Đăng nhập tại đây</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 35 }}>
                    <View style={styles.iconsContainer}>
                        <Icon name="facebook" style={styles.iconSocial} />
                        <Icon name="google" style={styles.iconSocial} />
                        <Icon name="apple" style={styles.iconSocial} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
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
    input: {
        borderRadius: 5,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderColor: "#d70018",
        borderWidth: 1,
        marginBottom: 10,
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
    buttonText: {
        fontSize: 20,
        padding: 10,
        color: '#FFF',
        fontWeight: 'bold'
    },
    textForgot: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
        textAlign: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    iconSocial: {
        fontSize: 30,
        color: '#CCC'
    },

    // Modal
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        position: 'relative', // Để định vị nút "X"
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#d70018',
        borderRadius: 5,
        width: '100%',
        padding: 10,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#d70018',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

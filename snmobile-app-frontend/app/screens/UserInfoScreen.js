import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import User from '../components/profile/User';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_ID, PUT_ID } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoScreen = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            setUserId(userId);
            if (userId) {
                const response = await GET_ID("user", userId);
                const userData = response.data;
                setUser(userData);
                setName(userData.name || "");
                setUsername(userData.username || "");
                setEmail(userData.email || "");
                setPhone(userData.phone || "");
                setAddress(userData.address || "");
                setGender(userData.gender || "");
            }
        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdateInfo = async () => {
        if (!password) {
            Alert.alert("Vui lòng nhập mật khẩu!");
            return;
        }

        const data = {
            name,
            username,
            phone,
            gender,
            address,
            password,
        };

        try {
            const response = await PUT_ID("user", userId, data);
            console.log("Updated user data:", response.data);
            Alert.alert("Cập nhật thành công");
            setPassword("");
            setPasswordModalVisible(false);
            fetchUserData();
        } catch (error) {
            console.log("Error updating user data:", error);
            Alert.alert("Cập nhật thất bại. Kiểm tra lại mật khẩu!");
        }
    };


    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            Alert.alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Mật khẩu mới không khớp!");
            return;
        }

        const data = {
            name,
            username,
            phone,
            gender,
            address,
            password: newPassword,
        };

        try {
            const response = await PUT_ID("user", userId, data);
            console.log("Password changed successfully:", response.data);
            Alert.alert("Đổi mật khẩu thành công!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setChangePasswordModalVisible(false);
        } catch (error) {
            console.log("Error changing password:", error);
            Alert.alert("Đổi mật khẩu thất bại. Kiểm tra lại mật khẩu hiện tại!");
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.InfoContainer}>
                        <User userId={userId} />
                        <View style={styles.InfoMain}>
                            <View style={styles.mainItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.itemName}>Họ và tên: </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Chưa cập nhật"
                                        placeholderTextColor="#777"
                                    />
                                </View>
                                <TouchableOpacity>
                                    <Icon name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.itemName}>Email: </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="Chưa cập nhật"
                                        placeholderTextColor="#777"
                                    />
                                </View>
                                <TouchableOpacity>
                                    <Icon name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.itemName}>Giới tính: </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={gender}
                                        onChangeText={setGender}
                                        placeholder="Chưa cập nhật"
                                        placeholderTextColor="#777"
                                    />
                                </View>
                                <TouchableOpacity>
                                    <Icon name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.itemName}>Số điện thoại: </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={phone}
                                        onChangeText={setPhone}
                                        placeholder="Chưa cập nhật"
                                        placeholderTextColor="#777"
                                    />
                                </View>
                                <TouchableOpacity>
                                    <Icon name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.itemName}>Địa chỉ: </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={address}
                                        onChangeText={setAddress}
                                        placeholder="Chưa cập nhật"
                                        placeholderTextColor="#777"
                                    />
                                </View>
                                <TouchableOpacity>
                                    <Icon name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.tabBg1} onPress={() => setChangePasswordModalVisible(true)}>
                            <Text style={styles.tabText}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBg} onPress={() => setPasswordModalVisible(true)}>
                            <Text style={styles.tabText}>Cập nhật thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Nhập mât khẩu</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Mật khẩu của bạn"
                            placeholderTextColor="#777"
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdateInfo}>
                            <Text style={styles.modalButtonText}>Cập nhật tài khoản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPasswordModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={changePasswordModalVisible}
                onRequestClose={() => setChangePasswordModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Mật khẩu hiện tại"
                            placeholderTextColor="#777"
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.modalInput}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Mật khẩu mới"
                            placeholderTextColor="#777"
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.modalInput}
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                            placeholder="Nhập lại mật khẩu mới"
                            placeholderTextColor="#777"
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleChangePassword}>
                            <Text style={styles.modalButtonText}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setChangePasswordModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </SafeAreaView>
    );
};


export default UserInfoScreen;

const styles = StyleSheet.create({
    InfoContainer: {
        flex: 1,
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

    InfoMain: {
        marginTop: 10,
        padding: 20,

    },
    mainItem: {
        borderBottomWidth: 1,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    itemName: {
        color: '#777',
        fontSize: 14,
    },
    input: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
    tabBg: {
        backgroundColor: "#d70018",
        borderRadius: 15,
        marginHorizontal: 30,
        marginTop: 20,

    },
    tabBg1: {
        backgroundColor: '#FF7D05',
        borderRadius: 15,
        marginHorizontal: 30,
    },

    tabText: {
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: "#d70018",
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    modalButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalCancelText: {
        color: '#d70018',
        marginTop: 15,
        fontWeight: 'bold',
    }

});

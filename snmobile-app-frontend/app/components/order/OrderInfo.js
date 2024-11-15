import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderInfo } from './../../redux/OrderReducer';
import Toast from 'react-native-toast-message';
import { GET_ALL } from './../../api/apiService';

const OrderInfo = ({ setCurrentStep }) => {
    const dispatch = useDispatch();

    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await GET_ALL('shops');
                setShops(response.data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchShop();
    }, [])

    const radioButtons = [
        { id: '1', label: 'Nhận tại cửa hàng' },
        { id: '2', label: 'Giao hàng tận nơi' }
    ];
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);


    const [selectedId, setSelectedId] = useState('0');

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const [nameShop, setNameShop] = useState('');
    const [isOtherReceiver, setIsOtherReceiver] = useState(false);
    const [otherReceiverName, setOtherReceiverName] = useState('');
    const [otherReceiverPhone, setOtherReceiverPhone] = useState('');
    const [isScreenSupport, setIsScreenSupport] = useState(false);
    const [screenSupport, setScreenSupport] = useState('');

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => {
                if (response.data.error === 0) {
                    setProvinces(response.data.data.map(province => ({ label: province.name, value: province.id })));
                }
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
                .then(response => {
                    if (response.data.error === 0) {
                        setDistricts(response.data.data.map(district => ({ label: district.name, value: district.id })));
                        setWards([]);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
                .then(response => {
                    if (response.data.error === 0) {
                        setWards(response.data.data.map(ward => ({ label: ward.name, value: ward.id })));
                    }
                })
                .catch(error => console.error(error));
        }
    }, [selectedDistrict]);

    const provinceName = provinces.find(province => province.value === selectedProvince)?.label || 'Chưa có thông tin';
    const districtName = districts.find(district => district.value === selectedDistrict)?.label || 'Chưa có thông tin';
    const wardName = wards.find(ward => ward.value === selectedWard)?.label || 'Chưa có thông tin';


    const handleContinue = () => {
        if (!name || !phone || !email) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Vui lòng điền đầy đủ thông tin!`,
                type: 'error',
                position: 'top',
            });
            return;
        }

        if (!selectedId) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Vui lòng chọn phương thức nhận hàng!`,
                type: 'error',
                position: 'top',
            });
            return;
        }
        if (selectedId === '1' && !selectedShop) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Vui lòng chọn cửa hàng nhận hàng!`,
                type: 'error',
                position: 'top',
            });
            return;
        }

        if (selectedId === '2' && (!provinceName || !districtName || !wardName || !address)) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng!`,
                type: 'error',
                position: 'top',
            });
            return;
        }

        if (isOtherReceiver && (!otherReceiverName || !otherReceiverPhone)) {
            Toast.show({
                text1: 'Thông báo',
                text2: `Vui lòng điền đầy đủ tên và số điện thoại của người nhận khác!`,
                type: 'error',
                position: 'top',
            });
            return;
        }


        const orderInfo = {
            name,
            phone,
            email,
            note,
            selectedShop,
            nameShop,
            provinceName,
            districtName,
            wardName,
            address,
            otherReceiverName,
            otherReceiverPhone,
            screenSupport
        };
        dispatch(createOrderInfo(orderInfo));
        setCurrentStep(2);
    };


    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 5 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ padding: 10, fontSize: 24 }}>Thông tin nhận hàng</Text>
                    <View style={styles.orderContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Vui lòng nhập họ và tên(bắt buộc)"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#666"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Vui lòng nhập số điện thoại(bắt buộc)"
                            value={phone}
                            onChangeText={setPhone}
                            placeholderTextColor="#666"
                            keyboardType='phone-pad'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Vui lòng nhập địa chỉ email(bắt buộc)"
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={{ fontSize: 16 }}>Chọn phương thức nhận hàng:</Text>
                        <View style={{ paddingTop: 5 }}>
                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={setSelectedId}
                                selectedId={selectedId}
                                layout='row'
                            />
                            {selectedId === '1' && (
                                <View style={{ padding: 10 }}>
                                    <View style={styles.container2}>
                                        <Text>Hệ thống cửa hàng</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            data={shops.map(shop => ({ label: shop.address, value: shop.id }))}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Chọn cửa hàng"
                                            value={selectedShop}
                                            onChange={item => {
                                                setSelectedShop(item.value);
                                                setNameShop(item.label);
                                            }}
                                        />

                                    </View>
                                </View>
                            )}
                            {selectedId === '2' && (
                                <View style={{ padding: 10 }}>
                                    <View style={styles.container2}>
                                        <Text>Tỉnh/Thành phố</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            data={provinces}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Chọn tỉnh thành"
                                            value={selectedProvince}
                                            onChange={item => {
                                                setSelectedProvince(item.value);
                                                setSelectedDistrict(null);
                                                setSelectedWard(null);
                                            }}
                                        />
                                    </View>
                                    <View style={styles.container2}>
                                        <Text>Quận/huyện</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            data={districts}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Chọn huyện"
                                            value={selectedDistrict}
                                            onChange={item => {
                                                setSelectedDistrict(item.value);
                                                setSelectedWard(null);
                                            }}

                                        />
                                    </View>
                                    <View style={styles.container2}>
                                        <Text>Xã/Phường</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            data={wards}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Chọn xã/phường"
                                            value={selectedWard}
                                            onChange={item => setSelectedWard(item.value)}
                                        />
                                    </View>
                                    <View style={{ borderColor: '#CCC', borderWidth: 1, padding: 5, borderRadius: 5 }}>
                                        <Text>Địa chỉ</Text>
                                        <TextInput
                                            style={{ padding: 5 }}
                                            placeholderTextColor="#666"
                                            value={address}
                                            onChangeText={text => setAddress(text)}
                                        />
                                    </View>


                                </View>

                            )}
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={{ fontSize: 16, paddingBottom: 10 }}>Ghi chú của khách hàng</Text>

                            <View style={styles.textareaContainer}>
                                <TextInput
                                    style={styles.textarea}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={note}
                                    onChangeText={setNote}
                                />
                            </View>

                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={isOtherReceiver}
                                    onValueChange={setIsOtherReceiver}
                                />
                                <Text style={styles.checkboxLabel}>Gọi người khác nhận(nếu có)</Text>
                            </View>
                            {isOtherReceiver && (
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập họ tên người nhận(bắt buộc)"
                                        placeholderTextColor="#666"
                                        value={otherReceiverName}
                                        onChangeText={setOtherReceiverName}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập số điện thoại của người nhận(bắt buộc)"
                                        placeholderTextColor="#666"
                                        keyboardType='phone-pad'
                                        value={otherReceiverPhone}
                                        onChangeText={setOtherReceiverPhone}
                                    />
                                </View>
                            )}
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={isScreenSupport}
                                    onValueChange={(newValue) => {
                                        setIsScreenSupport(newValue);
                                        if (newValue) {
                                            setScreenSupport('Hỗ trợ gián màn hình, chuyển dữ liệu');
                                        } else {
                                            setScreenSupport('');
                                        }
                                    }}
                                />
                                <Text style={styles.checkboxLabel}>Hỗ trợ gián màn hình,chuyển dữ liệu</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={styles.tabBg} onPress={handleContinue}>
                            <Text style={styles.tabText}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OrderInfo

const styles = StyleSheet.create({
    orderContainer: {
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        padding: 10,
        paddingTop: 15
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 18,
    },

    textareaContainer: {
        height: 100,
        padding: 5,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
    },
    textarea: {
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#blue',
    },
    tabBg: {
        backgroundColor: "#d70018",
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
    container2: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 5,
        borderRadius: 5,
        marginBottom: 15,
    },
    dropdown: {
        height: 30,
        marginHorizontal: 5
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    }

})

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GET_ID } from '../../api/apiService';
import { useState } from 'react';
import { formatCurrency } from './../../utils/utils';
import { useFocusEffect } from '@react-navigation/native';

const User = ({ userId }) => {
    const [user, setUser] = useState({});

    const fetchUserData = async () => {
        try {
            if (userId) {
                const response = await GET_ID("user", userId);
                setUser(response.data);
            }
        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [userId])
    );

    const calculatePoints = (total) => {
        return total ? Math.floor(total / 1000000) : 0;
    };
    return (
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.containerAvatar}>
                        <Image style={styles.avatar} source={require('../../assets/images/avatar1.png')} resizeMode='cover' />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#FFF' }}>SN Member</Text>
                        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>{user.name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.containerRank}>
                    <Image style={styles.avatar} source={require('../../assets/images/rank/rankKimCuon.png')} resizeMode='cover' />
                </TouchableOpacity>
            </View>
            <View style={styles.headerMain}>
                <View style={styles.mainContainer}>
                    <Icon name="wallet" size={30} color={"#d70018"} />
                    <View style={{ marginLeft: 5 }}>
                        <Text>Tổng chi tiêu</Text>
                        <Text style={{ fontSize: 16, color: "#d70018", fontWeight: 'bold' }}>{formatCurrency(user.total)}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#CCC' }}></View>
                <View style={styles.mainContainer}>
                    <Icon name="piggy-bank" size={30} color={"#d70018"} />
                    <View style={{ marginLeft: 5 }}>
                        <Text>Điểm tích lũy</Text>
                        <Text style={{ fontSize: 16, color: "#d70018", fontWeight: 'bold' }}>{calculatePoints(user.total)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

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


});
export default User
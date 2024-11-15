import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.containerHeader}>
                <View style={styles.searchRow}>
                    <Pressable style={{ paddingRight: 5 }} onPress={() => navigation.replace('Home')}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
                            <Text style={{ color: '#000' }}>SN</Text> Mobile
                        </Text>
                    </Pressable>
                    <View style={styles.search}>
                        <Ionicons name="search" size={22} color="#CCC" />
                        <TextInput style={styles.searchInput} placeholder="Bạn cần tìm gì?" placeholderTextColor="#888" />
                    </View>
                    <Pressable style={styles.containerAvatar}>
                        <Image style={styles.avatar} source={require('../assets/images/avatar1.png')} resizeMode='cover' />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#d70018',
        paddingBottom: 10,
        paddingVertical: 10,

    },
    containerHeader: {
        paddingHorizontal: 10,
    },

    containerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        alignItems: 'center',
        marginLeft: 5
    },
    avatar: {
        height: '100%',
        width: '100%',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,

    },

    search: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        height: '50',
        width: '62%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#d70018',
    },
    searchInput: {
        fontSize: 15,
        paddingLeft: 10
    },
})
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import WishlistItem from './../components/wishlist/WishlistItem';
import { ScrollView } from 'react-native-virtualized-view';

const WishListScreen = () => {

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.containerText}>Sản phẩm yêu thích</Text>
                    <WishlistItem />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default WishListScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginHorizontal: 10,

    },
    containerText: {
        fontSize: 22,
        color: '#d70018',
        fontWeight: '600',
        padding: 5
    },

    containerTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    tabBg: {
        backgroundColor: "#d70018",
        borderRadius: 25,

    },
    tabText: {
        color: '#FFF',
        fontSize: 18,
        padding: 10,
        paddingHorizontal: 35,
        fontWeight: 'bold'
    },
    discountCode: {
        marginTop: 10
    }
});
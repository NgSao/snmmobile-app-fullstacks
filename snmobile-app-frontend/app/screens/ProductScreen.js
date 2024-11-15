import { StyleSheet, SafeAreaView, View } from 'react-native'
import React from 'react'
import Header from './../components/Header';
import { ScrollView } from 'react-native-virtualized-view'
import CategoryProduct from '../components/CategoryProduct';

const ProductScreen = ({ route }) => {
    const { item, flag } = route.params;
    // console.log('Tpo là sao', item);
    // console.log('Cờ', flag);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header />
                <ScrollView
                    scrollEnabled={true}>
                    {flag ? (
                        <CategoryProduct item={item} flag={true} />
                    ) : (
                        <CategoryProduct item={item} flag={item.id} />
                    )}
                </ScrollView>
            </View>

        </SafeAreaView >
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

})
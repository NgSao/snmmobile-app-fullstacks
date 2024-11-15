import { SafeAreaView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ImageBackground, FlatList, StatusBar } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Category from '../components/Category'
import QuickView from '../components/QuickView'
import Special from '../components/Special'
import CategoryProduct from '../components/CategoryProduct'




const HomeScreen = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header />
                <ScrollView
                    scrollEnabled={true}>
                    <Banner />
                    <Category />
                    <QuickView />
                    <Special />
                    <CategoryProduct item={1} flag={false} />
                    <CategoryProduct item={2} flag={false} />

                </ScrollView>

            </View>
            {/* <Advertisement />
            <BoxChat /> */}
        </SafeAreaView >


    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },




})
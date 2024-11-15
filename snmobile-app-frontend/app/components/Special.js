import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Product from './Product'

const Special = () => {
    return (
        <View style={{ flex: 3, backgroundColor: '#fbcb8b', marginTop: 15 }}>
            <Image style={{ flex: 1, height: '100%', width: '100%', paddingVertical: 20 }} source={{ uri: 'https://minhtuanmobile.com/uploads/slide/1000x115-100.jpg' }} />
            <Product />
        </View>
    )
}

export default Special

const styles = StyleSheet.create({})
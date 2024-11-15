import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import ProductItem from './ProductItem'
import { TouchableOpacity } from 'react-native'

const CategoryProduct = ({ item, flag }) => {
    return (
        <>
            {flag ? (
                <View style={{ backgroundColor: '#CCC', paddingBottom: 20 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <CategoryItem id={item} flag={flag} />
                    </View>
                </View>
            ) : (
                <View style={{ marginTop: 20, backgroundColor: '#fbcb8b', paddingBottom: 20 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <CategoryItem id={item} flag={flag} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.container}>
                                <Text style={{ color: '#d70018' }}>Xem toàn bộ sản phẩm</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            )}
        </>

    )
}

export default CategoryProduct

const styles = StyleSheet.create({
    container: { borderWidth: 1, padding: 5, borderColor: '#d70018', borderRadius: 5 }
})
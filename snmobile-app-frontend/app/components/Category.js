import { StyleSheet, Text, TouchableOpacity, Image, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GET_ALL } from './../api/apiService';
const Category = () => {
    const navigation = useNavigation();
    const [category, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await GET_ALL("categories")
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemCategory} onPress={() => navigation.navigate('ProductScreen', { item, flag: true })}>
            <Image style={styles.categoryImage} source={{ uri: item.imageUrl }} resizeMode="contain" />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    )

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={styles.containerCategory} >
            <FlatList
                data={category}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )

}

export default Category

const styles = StyleSheet.create({
    containerCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#d70018",
        flex: 1
    },
    itemCategory: {
        marginRight: 40,
        paddingTop: 5,
        paddingBottom: 5,
        width: 50,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        opacity: 5
    },
    categoryText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
    },
})
import { StyleSheet, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GET_ID } from '../../api/apiService';
import { TouchableOpacity } from 'react-native';

const ProductImage = ({ image, noId }) => {
    const [images, setImages] = useState([]);

    const fetchImage = async () => {
        try {
            const response = await GET_ID("products/images", noId);
            setImages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [noId]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.imageContainer}>
            <Image style={styles.productImage} source={{ uri: item.imageUrl }} resizeMode="contain" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image style={styles.mainImage} source={{ uri: image }} resizeMode="contain" />
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

export default ProductImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    mainImage: {
        width: '100%',
        height: 250,
        borderBottomWidth: 1,
        borderColor: '#CCC',

    },
    flatListContainer: {
        paddingVertical: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    productImage: {
        width: 150,
        height: 150,
    },
});


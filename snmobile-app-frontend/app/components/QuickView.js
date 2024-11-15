import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { GET_ALL } from './../api/apiService';

const QuickView = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            const response = await GET_ALL("products")
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);




    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemQuick} onPress={() => navigation.navigate("ProductScreen", { item, flag: false })} >
            <Image style={styles.quickImage} source={{ uri: item.images[0].imageUrl }} resizeMode="contain" />
            <Text style={styles.quickText}>{item.name}</Text>
            {item.status !== null && (
                <View style={styles.hotContainer}>
                    <ImageBackground style={styles.quickImageHot} source={require('../assets/images/quickview.png')} resizeMode="contain">
                        <Text style={styles.quickHotText}>{item.status}</Text>
                    </ImageBackground>
                </View>
            )}
        </TouchableOpacity>
    );





    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={styles.containerQuick}>
            <Carousel
                loop
                width={120}
                height={100}
                autoPlay={true}
                autoPlayInterval={2000}
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.carousel}
                horizontal={true}
                scrollAnimationDuration={1000}
            />
        </View>
    );
};

export default QuickView;

const styles = StyleSheet.create({
    containerQuick: {
        marginTop: 10,
        marginHorizontal: 25,
        flex: 1,
    },
    itemQuick: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    hotContainer: {
        height: 30,
        width: 30,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    carousel: {
        width: '100%',
    },
    quickImageHot: {
        width: '100%',
        height: '100%',
    },
    quickImage: {
        width: '80%',
        height: '70%',
    },
    quickText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    quickHotText: {
        fontSize: 8,
        fontWeight: 'bold',
        position: 'absolute',
        paddingTop: 16,
        textAlign: 'center',
        width: '100%',
        color: '#000',
    },
});

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { GET_ALL } from './../api/apiService';

const Product = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            const response = await GET_ALL("products/all")
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

    // console.log(products);
    // JSON.stringify(value[, replacer[, space])) chuyển đổi đố tường thành 1 chuổi json
    // console.log(JSON.stringify(products, null, 2));

    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('vi-VN') + ' đ';
    };
    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            let name = i <= rating ? 'star' : 'star-o';
            stars.push(<Icon key={i} name={name} style={styles.radingIcon} />);
        }
        return stars;
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemProductFastList}
            activeOpacity={0.8} onPress={() => navigation.navigate("DetailScreen", { colorId: item.colorId })}>
            <Image style={styles.productImag} source={{ uri: item.colors[0].imageUrl }} />
            <View style={styles.productTrademark}>

                {item.discount !== null ? (
                    <View style={styles.trademarkSaleContainer}>
                        <Text style={styles.trademarkSale}>-{item.discount}%</Text>
                    </View>
                ) : (
                    <View style={styles.trademarkSaleContainer}>
                    </View>
                )}

                {item.brandId !== 2 ? (
                    <Image style={{ width: '50%', height: 15 }} source={{ uri: 'https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png' }} resizeMode="contain" />
                ) : (
                    <>
                    </>
                )}
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name} {item.size}</Text>
                <View style={styles.productDetails}>
                    <Text style={styles.productPriceSale}>
                        {formatPrice(calculateDiscountedPrice(item.price, item.discount))}
                    </Text>
                    <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                </View>
                <View style={styles.productDetailsInstallment}>
                    <Text style={styles.productTextInstallment}>Hoặc trả trước</Text>
                    <Text style={styles.productPriceInstallment}>
                        {formatPrice(item.price / 4)}
                    </Text>
                </View>
                <View style={styles.Rading}>
                    {renderStars(item.rating)}
                </View>
            </View>
        </TouchableOpacity>
    )


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={styles.containerProduct}>
            <Carousel
                loop
                width={170}
                height={240}
                autoPlay={true}
                autoPlayInterval={5000}
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.colorId.toString()}
                horizontal={true}
                style={styles.carousel}
                scrollAnimationDuration={2000}

            />
        </View>
    );
};

export default Product

const styles = StyleSheet.create({
    containerProduct: {
        flexDirection: 'row',
        marginHorizontal: 25,
        marginBottom: 10
    },
    itemProductFastList: {
        // height: 215,
        height: 225,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },

    productImag: {
        marginTop: 18,
        width: '100%',
        height: 125
    },
    productTrademark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        margin: 10,
        width: '100%'
    },
    trademarkSaleContainer: {
        backgroundColor: "#d70018",
        borderRadius: 5,

    },
    trademarkSale: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        padding: 2,
    },

    productInfo: {
        padding: 1,
        marginStart: 5,
        marginEnd: 5
    },

    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },

    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2

    },
    productPriceSale: {
        fontSize: 11,
        color: "#d70018",
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 11,
        textDecorationLine: 'line-through',
    },
    productDetailsInstallment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productTextInstallment: {
        fontSize: 10,
    },
    productPriceInstallment: {
        paddingLeft: 2,
        fontSize: 10,
        color: "#d70018",
    },
    Rading: {
        flexDirection: 'row',
        marginTop: 2,
        marginLeft: 2
    },
    radingIcon: {
        color: "#F59E0B",
        marginRight: 2
    },
    carousel: {
        width: '100%',

    }
})

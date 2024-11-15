
import { StyleSheet, Text, ActivityIndicator, View, Image, SafeAreaView, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductStock from '../components/product/ProductStock';
import BottomTab from '../components/BottomTab';
import Guarantee from '../components/product/Guarantee';
import Promotion from './../components/product/Promotion';
import ProductDescription from '../components/product/ProductDescription';
import Review from './../components/Review';
import ProductImage from '../components/product/ProductImage';
import { ScrollView } from 'react-native-virtualized-view';
import { GET_ID } from '../api/apiService';
import Lottie from 'lottie-react-native';



const ProductDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // const { colorId } = route.params;
    const { colorId: initialColorId } = route.params;
    const [colorId, setColorId] = useState(initialColorId);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const response = await GET_ID("products/color", colorId);
            setProduct(response.data);
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    }

    useEffect(() => {
        fetchProduct();
    }, [colorId]);


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

    const handleColorChange = (newColorId) => {
        setColorId(newColorId);
    };



    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Lottie source={require('../assets/animation/Loading.json')} autoPlay loop />
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} >
            <View style={styles.container}>
                <ScrollView style={{ flex: 5 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, backgroundColor: '#FFF' }} >
                        <ProductImage image={product.colors[0].imageUrl} noId={product.id} />

                        {product.brandId == 1 ? (
                            <View style={styles.productTrademark}>
                                <Image style={{ width: '50%', height: 20 }} source={{ uri: 'https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png' }} resizeMode="contain" />
                            </View>
                        ) : (
                            <></>
                        )
                        }

                    </View>
                    <View style={styles.line} />
                    <View style={{ flex: 2, backgroundColor: '#FFF', justifyContent: 'center', marginTop: 10 }} >
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name} {product.size}</Text>

                            <View style={styles.Rading}>
                                {renderStars(product.rating)}
                            </View>
                            <Text style={styles.productText}>
                                {/* Nhập mã 15KTDHI khi thanh toán tiền mặt/ chuyển khoản hoặc trả góp */}
                            </Text>
                            <Text style={styles.productName}>
                                {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                            </Text>
                        </View>

                    </View>
                    <View style={{ flex: 3, backgroundColor: '#FFF', marginTop: 10 }} >
                        <Text style={styles.productText1}>Giá bán</Text>
                        <View style={styles.productPrice}>
                            <Text style={styles.price1}>
                                {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                            </Text>
                            <Text style={styles.price2}>{formatPrice(product.price)}</Text>
                        </View>
                        <ProductStock productId={product.id} colorId={product.colorId} stockId={product.stockId}
                            setSelectedColor={handleColorChange} />
                    </View>

                    {/* <Promotion />
                    <Guarantee />


                    <ProductDescription />
                    <Review /> */}
                </ScrollView>

                <BottomTab product={product} />
            </View>



        </SafeAreaView>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        marginHorizontal: 20
    },

    line: {
        height: 1,
        backgroundColor: '#CCC',
    },
    productTrademark: {
        position: 'absolute',
        margin: 6,
        width: '100%',
        alignItems: 'flex-end',

    },


    productInfo: {
        alignItems: 'flex-start',
        borderBottomWidth: 1
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#d70018",
    },
    Rading: {
        flexDirection: 'row',
        marginTop: 2,
        justifyContent: 'flex-start',
        width: '90%',
        marginBottom: 5
    },
    radingIcon: {
        color: "#F59E0B",
        marginRight: 5,
        fontSize: 20
    },
    productText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#d70018"
    },
    productText1: {
        fontSize: 16,
        marginBottom: 2,
        color: '#000'
    },
    productPrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#d70018",
        marginRight: 8
    },
    price2: {
        fontSize: 16,
        textDecorationLine: 'line-through',
    },


})


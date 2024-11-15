import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishList } from "../../redux/WishListReducer";
const WishlistItem = () => {
    const navigation = useNavigation();
    const cart = useSelector((state) => state.wishlist.wishlist);
    const dispatch = useDispatch();

    const deleteItem = (item) => {
        dispatch(removeFromWishList(item));
    };

    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('vi-VN') + ' đ';
    };
    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };



    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => { navigation.navigate('DetailScreen', { colorId: item.colorId }) }}>
                <Image style={styles.image} source={{ uri: item.colors[0].imageUrl }} resizeMode="contain" />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name} {item.size}</Text>
                    <Text>Màu:<Text>{item.colors[0].color}</Text></Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.salePrice}>
                            {formatPrice(calculateDiscountedPrice(item.price, item.discount))}
                        </Text>
                        <Text style={styles.originalPrice}>{formatPrice(item.price)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.removeButtonContainer}>
                <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={styles.removeButton}>
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.quantityContainer}>
         
            </View> */}
        </View>
    );

    return (
        <View style={styles.containerCart}>

            {cart.length === 0 ? (
                <>

                    <View style={styles.noCotainer}>
                        <Text style={styles.noText}>Hiện chưa có sản phẩm yêu thích!</Text>
                    </View>

                </>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={item => item.colorId}
                    />
                </>
            )}

        </View>
    );
};

export default WishlistItem;

const styles = StyleSheet.create({
    containerCart: {
        marginTop: 5,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#CCC'
    },
    cartItem: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginBottom: 15,
        position: 'relative'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 70,
    },
    itemDetails: {
        marginLeft: 10,
    },
    itemName: {
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
    },
    salePrice: {
        color: "#d70018",
        paddingRight: 10,
    },
    originalPrice: {
        color: '#000',
        textDecorationLine: 'line-through',
    },
    removeButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 7,
    },
    removeButton: {
        backgroundColor: '#F7F7F7',
        padding: 2,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
    },
    quantityButton: {
        paddingHorizontal: 10,
        borderColor: '#CCC',
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 10,
    },
    noCotainer: {
        backgroundColor: '#ffe69c',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    noText: {
        fontSize: 16
    }
});

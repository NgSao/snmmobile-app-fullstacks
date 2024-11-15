import { StyleSheet, Text, ActivityIndicator, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GET_ID } from '../../api/apiService'
import { ScrollView } from 'react-native-virtualized-view';

const ProductStock = ({ productId, stockId, colorId, setSelectedColor }) => {
    // console.log("id", productId);
    // console.log("stock", stockId);
    // console.log("colorId", colorId);

    const [stock, setStock] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStockId, setSelectedStockId] = useState(stockId);
    const [selectedColorId, setSelectedColorId] = useState(colorId);


    const fetchStock = async () => {
        try {
            const response = await GET_ID("stocks/product", productId);

            setStock(response.data);

            await fetchColor();

        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    }

    // console.log("size", JSON.stringify(stock, null, 2));

    const fetchColor = async () => {
        try {
            const response = await GET_ID("stocks", selectedStockId);
            setColors(response.data);
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    }

    useEffect(() => {
        fetchStock();
    }, [productId]);


    useEffect(() => {
        if (selectedStockId) {
            fetchColor(selectedStockId);
        }
    }, [selectedStockId]);

    // console.log("duliene", JSON.stringify(colors, null, 2));
    // useEffect(() => {
    //     console.log("Dữ liệu colors:", JSON.stringify(colors, null, 2));
    // }, [colors]);

    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('vi-VN') + ' đ';
    };

    const handleColorSelect = (newColorId) => {
        setSelectedColorId(newColorId);
        setSelectedColor(newColorId);
    };



    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    // console.log("size", selectedStockId);
    const renderStock = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => setSelectedStockId(item.id)} key={item.id}
                style={selectedStockId === item.id ? styles.itemSize : styles.itemSizeNot}>
                {selectedStockId === item.id ? (
                    <View style={styles.checkMark}>
                        <Text style={styles.checkMarkText}>✓</Text>
                    </View>
                ) : (
                    <></>
                )}
                <Text style={styles.sizeText}>{item.size}</Text>

                <Text style={styles.sizePrice}>{formatPrice(item.price)}</Text>
            </TouchableOpacity>
        )
    }



    // console.log("ColorId", selectedColorId);
    const renderColor = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleColorSelect(item.id)}
                style={selectedColorId === item.id ? styles.itemColor : styles.itemColorNot}>
                <Image style={styles.colorImg} source={{ uri: item.image.imageUrl }} resizeMode="cover" />
                {selectedColorId === item.id ? (
                    <>
                        <View style={styles.checkMark}>
                            <Text style={styles.checkMarkText}>✓</Text>
                        </View>
                        <View style={styles.colorContainer}>
                            <Text style={styles.colorText}>{item.color}</Text>
                            <Text style={styles.colorPrice}>{formatPrice(colors.price)}</Text>
                        </View>
                    </>
                ) : (
                    <View style={styles.colorContainer}>
                        <Text style={styles.colorTextNot}>{item.color}</Text>
                        <Text style={styles.colorPriceNot}>{formatPrice(colors.price)}</Text>
                    </View>
                )}

            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={styles.productSize}>
                <FlatList
                    data={stock}
                    horizontal
                    renderItem={renderStock}
                    keyExtractor={item => item.id.toString()} />
            </View>
            <Text style={styles.productTextColor}>Màu sắc</Text>
            <View style={styles.productColor}>
                <View style={{ flex: 1, padding: 5 }}>
                    <FlatList
                        data={colors.colors}
                        renderItem={renderColor}
                        numColumns={2}
                        keyExtractor={item => item.id.toString()}
                    />

                </View>

            </View>
        </View>
    )
}


export default ProductStock

const styles = StyleSheet.create({
    productSize: {
        marginTop: 5,
    },
    itemSize: {
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1,
        padding: 2,
        paddingHorizontal: 15,
        borderRadius: 7,
        backgroundColor: '#fff',
        elevation: 5,
        position: 'relative',
        height: 50,
    },

    checkMark: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: "#d70018",
        width: 18,
        height: 14,
        borderRadius: 0,
        borderBottomEndRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkMarkText: {
        lineHeight: 14,
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold'

    },


    itemSizeNot: {
        marginRight: 20,
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
        padding: 2,
        paddingHorizontal: 15,
        borderRadius: 7,
        backgroundColor: '#fff',
        justifyContent: 'center',
        elevation: 5,
        height: 50,

    },
    sizeText: {
        color: 'black',
        fontSize: 14
    },
    sizePrice: {
        color: "#d70018",
        fontSize: 14
    },
    productTextColor: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 2,
    },
    productColor: {
        flex: 3,
    },
    itemColor: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 5,
        borderColor: "#d70018",
        marginBottom: 10,
        marginRight: 15,
        width: 165,
        height: 50,
        overflow: 'hidden',
    },
    itemColorNot: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 5,
        borderColor: '#000',
        marginBottom: 10,
        marginRight: 15,
        width: 165,
        height: 50,
        overflow: 'hidden',
    },
    colorImg: {
        width: '20%',
        height: '100%',
        marginLeft: 5
    },
    colorContainer: {
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
        marginLeft: 5

    },
    colorText: {
        color: "#d70018",
        fontSize: 14
    },
    colorTextNot: {
        color: '#000',
        fontSize: 14,
    },
    colorPrice: {
        color: "#d70018",
        fontSize: 14
    },
    colorPriceNot: {
        color: '#000',
        fontSize: 14
    },
})
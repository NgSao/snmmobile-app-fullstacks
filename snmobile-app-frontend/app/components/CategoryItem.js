import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Products from '../data/Products';
import { useState } from 'react';
import { useEffect } from 'react';
import { GET_ALL } from './../api/apiService';
import ProductItem from './ProductItem';

const CategoryItem = ({ id, flag }) => {
    const navigation = useNavigation();

    const initialSelected = (flag !== true && flag !== false) ? flag : 0;
    const [selected, setSelected] = useState(initialSelected);
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

    console.log(selected);
    console.log("Cờ dô rôid", flag);
    const filteredProducts =
        flag === true
            ? products.filter(product => product.categoryId === id.id)
            : flag === false
                ? products.filter(product => product.categoryId === id)
                : products.filter(product => product.id === flag)
    const renderItem = ({ item }) => {
        if (flag) {
            return (
                <TouchableOpacity style={styles.headerItem} onPress={() => {
                    setSelected(item.id);
                }}>
                    <View style={selected === item.id ? styles.cotainerImgActive : styles.cotainerImg}>
                        <Image
                            style={styles.itemImg}
                            source={{ uri: item.images[0].imageUrl }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.headerItem} onPress={() => {
                    navigation.navigate("ProductScreen", { item, flag: false });
                }}>
                    <View style={selected === item.id ? styles.cotainerImgActive : styles.cotainerImg}>
                        <Image
                            style={styles.itemImg}
                            source={{ uri: item.images[0].imageUrl }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
                </TouchableOpacity>
            );
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.containerHeader}>
                    {flag ? (
                        <TouchableOpacity style={styles.headerItem}
                            onPress={() => {
                                setSelected(selected === 0 ? 0 : 0);
                            }}>
                            <View style={selected === 0 ? styles.cotainerImgActive : styles.cotainerImg}>
                                <Image style={styles.itemImg} source={{ uri: id.imageUrl }} resizeMode="contain" />
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 12 }}>{id.name}</Text>
                        </TouchableOpacity>
                    ) : <>
                    </>
                    }
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={filteredProducts}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />

                </View>
            </View>
            {flag ? (
                <ProductItem id={selected} noId={id.id} flag={true} />
            ) :
                <ProductItem id={id} noId={id} flag={false} />
            }
        </>

    );
}
export default CategoryItem

const styles = StyleSheet.create({
    containerHeader: {
        paddingTop: 10,
        marginHorizontal: 10,
        paddingBottom: 10,
        flexDirection: 'row',

    },
    headerItem: {
        width: 60,
        marginRight: 15
    },
    cotainerImg: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#CCC',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cotainerImgActive: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        padding: 10,
        backgroundColor: "#d70018",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#CCC',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: 'center',
        alignItems: 'center',
    },


    itemImg: {
        width: 40,
        height: 40
    },
})

import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Banners from './../data/Banners';
import { GET_ALL } from './../api/apiService';

const Banner = () => {
    const { width } = Dimensions.get('window');
    const [banner, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fectchBanners = async () => {
        try {
            const response = await GET_ALL("banners")
            setBanners(response.data);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fectchBanners();
    }, []);
    console.log("banner", banner);


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={160}
                autoPlay={true}
                autoPlayInterval={2000}
                data={banner}
                renderItem={({ item }) => (
                    <View style={styles.bannerItem}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="stretch" />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },

});

export default Banner;

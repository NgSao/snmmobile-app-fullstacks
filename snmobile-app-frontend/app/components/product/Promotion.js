import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Promotion = () => {
    return (
        <View style={{ flex: 2 }} >
            <View style={styles.containerPromotion}>
                <View style={styles.promotionHeader}>
                    <Icon name="gift" style={{ fontSize: 20, color: '#FFF' }} />
                    <Text style={{ fontSize: 18, color: '#FFF', paddingLeft: 10, paddingRight: 5 }}>Khuyến mãi khi mua</Text>
                    <Text style={{ fontSize: 18, color: '#FFF' }}>iPhone 15</Text>
                </View>
                <View style={styles.promotionMain}>
                    <View style={styles.promotionTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Giảm <Text style={{ color: "#d70018" }}>200.000đ </Text>khi mua kèm Ốp lưng chính hãng Apple <Text style={{ color: "#d70018" }}>iPhone 15</Text> (Áp dụng từ 01/07 - 31/07)</Text>
                    </View>
                    <View style={styles.promotionTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Giảm <Text style={{ color: "#d70018" }}>200.000đ </Text>khi mua kèm Ốp lưng chính hãng Apple <Text style={{ color: "#d70018" }}>iPhone 15</Text> (Áp dụng từ 01/07 - 31/07)</Text>
                    </View>
                    <View style={styles.promotionTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Giảm thêm tới <Text style={{ color: "#d70018" }}>150.000đ</Text>khi sử dụng điểm tích lũy thành viên (Không áp dụng với chương trình khuyến mãi khác)</Text>
                    </View>
                    <View style={styles.promotionTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Thu giá cao trợ giá đến <Text style={{ color: "#d70018" }}>95%</Text></Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Promotion

const styles = StyleSheet.create({
    // Khuyến mãi
    containerPromotion: {
        marginBottom: 20,

    },
    promotionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#d70018",
        padding: 10,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,

    },
    promotionMain: {
        borderWidth: 1,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        borderColor: "#d70018"

    },
    promotionTitel: {
        flexDirection: 'row',
        padding: 5,
        paddingBottom: 10
    },
})
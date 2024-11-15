import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Guarantee = () => {
    return (
        <View style={{ flex: 2 }} >
            <View style={styles.containerGuarantee}>
                <View style={styles.guaranteeHeader}>
                    <Icon name="shield" style={{ fontSize: 70, color: "#d70018" }} />
                    <Text style={{ fontSize: 20, color: "#d70018", fontWeight: 'bold' }}>BẢO HÀNH CHÍNH HÃNG</Text>
                </View>
                <View style={styles.guaranteeMain}>
                    <View style={styles.guaranteeTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Máy mới fullbox 100% - Chưa Active - Chính hãng Apple</Text>
                    </View>
                    <View style={styles.guaranteeTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Được hỗ trợ 1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất
                        </Text>
                    </View>
                    <View style={styles.guaranteeTitel}>
                        <Icon name="check" style={{ fontSize: 16, color: 'blue', }} />
                        <Text style={{ fontSize: 16, paddingLeft: 5 }}>Bảo hành chính hãng Apple 12 tháng</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Guarantee

const styles = StyleSheet.create({
    containerGuarantee: {
        borderWidth: 1,
        borderColor: "#d70018",
        borderRadius: 10,
    },
    guaranteeHeader: {
        alignItems: 'center',
        padding: 10,
    },
    guaranteeMain: {
        borderTopWidth: 1,
        marginHorizontal: 10,
    },
    guaranteeTitel: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 5
    }

})
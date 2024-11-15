import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Promotions = () => {


    const promotions = [
        { id: '1', text: "Giảm 30% khi mua kèm cường lực full" },
        { id: '2', text: "Giảm 250.000đ khi mua gói bảo hành VIP 12 tháng (sẽ được trừ trực tiếp vào giá máy)" },
        { id: '3', text: "Giảm 100.000đ khi mua gói bảo hành VIP 6 tháng (sẽ được trừ trực tiếp vào giá máy)" },
        { id: '4', text: "Giảm 300.000đ cho đơn hàng từ 7 triệu cho thành viên mới của Kredivo" },
        { id: '5', text: "Giảm 700.000đ cho đơn hàng từ 10 triệu cho thành viên mới của Kredivo" },
        { id: '6', text: "Giảm 5% tối đa 200.000đ, áp dụng kỳ hạn 6/12 tháng khi thanh toán qua Kredivo. Chi tiết" },
        { id: '7', text: "Giảm 5% KHÔNG GIỚI HẠN GIÁ TRỊ KHUYẾN MÃI TỐI ĐA cho đơn từ 53.000đ khi thanh toán qua Home PayLater (4 lần/tháng)" },
        { id: '8', text: "Giảm 30.000đ cho đơn từ 120.000đ khi thanh toán qua Home PayLater (3 lần/tháng)" },
        { id: '9', text: "Hỗ trợ trả góp 0% chỉ cần CCCD gắn chip hoặc 0% qua thẻ tín dụng" }
    ];
    const SaleItem = ({ text }) => (
        <View style={styles.saleItem}>
            <Icon name="check" style={styles.itemIcon} />
            <Text style={styles.itemText}>{text}</Text>
        </View>
    );
    return (
        <View style={styles.headerContainerSale}>
            <Text style={{ fontWeight: 'bold' }}>Ưu đãi khi mua iPhone 14 Series </Text>
            <FlatList
                data={promotions}
                renderItem={({ item }) => <SaleItem text={item.text} />}
                keyExtractor={item => item.id} />
        </View>

    )
}

export default Promotions

const styles = StyleSheet.create({
    headerContainerSale: {
        margin: 10,
        backgroundColor: '#9eeaf9',
        padding: 10,
        borderRadius: 5,
        borderColor: '#CCC',
        borderWidth: 1,
    },
    saleItem: {
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 15,

    },
    itemIcon: {
        fontSize: 14,
        color: 'blue',
        marginTop: 2
    },
    itemText: {
        fontSize: 16,
    }
})
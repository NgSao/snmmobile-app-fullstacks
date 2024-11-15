import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDescription = () => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, paddingBottom: 10 }}>Thông tin sản phẩm</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>iPhone 15: Xứng đáng “siêu phẩm” quốc dân</Text>
                <Text style={styles.description}>
                    iPhone 15 sở hữu một mức giá rất mềm, nhưng lại trang bị nhiều công nghệ hiện đại, đáp ứng mọi nhu cầu của bạn.
                </Text>
                <Image
                    source={{ uri: 'https://minhtuanmobile.com/uploads/editer/images/2023/10/iphone-15-256gb-chinh-hang-vn-a-01.webp' }} // Thay thế bằng URL hình ảnh thực tế
                    style={{ width: '100%', height: 150, marginBottom: 10 }}
                />
                {expanded && (
                    <View style={styles.expandedContent}>
                        <Text style={styles.contentTitle}>Tổng quan iPhone 15</Text>
                        <Text style={styles.contentText}>
                            iPhone 15 sở hữu nhiều tính năng vô cùng nổi bật, gồm:
                            {'\n'}- Cổng Lightning sang USB-C, đánh dấu sự kết thúc của chiếc cổng kết nối ra mắt lần đầu tiên cùng với iPhone 5 năm 2012.
                            {'\n'}- Cả 4 mẫu trong dòng iPhone 15 đều có viền cực mỏng so với bất kỳ điện thoại nào của hãng từ trước đến nay.
                            {'\n'}- iPhone 15 và iPhone 15 Plus có các màu đen, trắng, xanh, vàng và hồng. Đối với iPhone 15 Pro/15 Pro Max sẽ có 4 màu: Black Titanium, Natural Titanium, White Titanium và Blue Titanium
                            {'\n'}- iPhone 15 vẫn duy trì phiên bản màn hình 6,1 inch, nhưng sở hữu nhiều công nghệ hiện đại của iPhone 14 Pro Max.
                            {'\n'}- Khung viền nhôm cao cấp chuẩn hàng không vũ trụ, giúp điện thoại bền bỉ và nhẹ hơn
                            {'\n'}- Camera chính được nâng cấp lên 48MP.
                        </Text>
                        <Text style={styles.contentTitle}>iPhone 15 sử dụng SIM nào?</Text>
                        <Text style={styles.contentText}>
                            Như thường lệ, iPhone 15 vẫn sử dụng SIM vật lý truyền thống ở khay thẻ SIM. Nó cũng có eSIM cho những ai thích sử dụng loại này.
                        </Text>
                        <Text style={styles.contentTitle}>iPhone 15 có mấy màu?
                        </Text>
                        <Text style={styles.contentText}>
                            iPhone 15 có 5 màu chính, gồm: Hồng, Xanh lá, Xanh dương, Vàng, Đen. Trong đó, màu hồng đang là lựa chọn được nhiều người yêu thích, nhất là phái nữ. Năm nay, màu hồng của iPhone 15 khá đẹp mắt và trending.                        </Text>
                        <Image
                            source={{ uri: 'https://minhtuanmobile.com/uploads/editer/images/2023/10/iphone-15-256gb-chinh-hang-vn-a-06.webp' }} // Thay thế bằng URL hình ảnh thực tế
                            style={{ width: '100%', height: 150, marginTop: 10, marginBottom: 10 }}
                        />
                        <Text style={styles.contentTitle}>Thông số kỹ thuật chính của iPhone 15</Text>
                        <Text>Dưới đây là các thông số kỹ thuật chính thức của iPhone 15: </Text>
                        <Text style={styles.contentText}>
                            {'\n'}- Màn hình: Super Retina XDR OLED 6,1 inch
                            {'\n'}- Dung lượng máy: 128GB, 256GB, 512GB
                            {'\n'}- Kích thước: 6.1 inch
                            {'\n'}- Pin: 3.912mAh
                            {'\n'}- Camera: Camera chính: 48MB, Camera siêu rộng: 12MP, Zoom quang 2x, Zoom kỹ thuật số 5x
                            {'\n'}- Thiết kế: Khung viền nhôm, 160.87 x 77.76 x 7.81 mm, 204g
                            {'\n'}- Chip: Chip A16 Bionic (4nm), 5 nhân GPU và 6 nhân CPU
                            {'\n'}- Màu sắc: Hồng, Xanh lá, Xanh dương, Vàng, Đen
                            {'\n'}- Tốc độ làm mới: 60Hz
                            {'\n'}- RAM: 6GB
                            {'\n'}- LiDAR Scanner: Không
                            {'\n'}- Cổng kết nối: USB-Type C
                            {'\n'}- OIS: Không
                        </Text>
                        <Image
                            source={{ uri: 'https://minhtuanmobile.com/uploads/editer/images/2023/10/iphone-15-256gb-chinh-hang-vn-a-10.webp' }} // Thay thế bằng URL hình ảnh thực tế
                            style={{ width: '100%', height: 150, marginTop: 10, marginBottom: 10 }}
                        />
                        <Text style={styles.contentText}>
                            Quý khách hàng hoàn toàn yên tâm khi lựa chọn sử dụng sản phẩm, dịch vụ tại SN Mobile.
                        </Text>
                    </View>
                )}
            </ScrollView>
            <TouchableOpacity onPress={handleToggleExpand} style={styles.expandButton}>
                <Text style={styles.expandButtonText}>
                    {expanded ? 'Rút gọn nội dung' : 'Xem thêm nội dung'}
                    <Icon
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        style={{ color: "#d70018", fontSize: 16 }}
                    />
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: 20,
        backgroundColor: '#F7F7F7',
        padding: 10,
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        marginBottom: 16,
    },
    expandButton: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        alignItems: 'center',
        borderWidth: 1,
        marginHorizontal: 60,
        padding: 5,
        borderColor: "#d70018",
        borderRadius: 10
    },
    expandButtonText: {
        color: "#d70018",
        fontSize: 18,
        alignItems: 'center',
    },
    expandedContent: {
        marginTop: 16,
    },
    contentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    contentText: {
        fontSize: 15,
        lineHeight: 22,
    },
});

export default ProductDescription;

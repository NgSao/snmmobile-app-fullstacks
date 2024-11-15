import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Review = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const [rating, setRating] = useState(0);
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Icon
                        name={i <= rating ? 'star' : 'star-o'}
                        style={styles.radingReview}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    }


    return (
        <View style={{ flex: 2 }}>
            <View style={styles.containerReview}>
                <View style={styles.tableReview}>
                    <Text style={{ fontSize: 16, paddingBottom: 5 }}>Đánh giá & nhận xét về <Text>iPhone 15 Pro Max 256GB - Chính hãng VN/A</Text> </Text>
                    <View style={styles.reivewHeader}>
                        <View style={styles.headerView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                            </View>
                            <Text style={{ fontSize: 16 }}>3 <Text>đánh giá</Text> </Text>
                        </View>
                        <View style={styles.headerView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                            </View>
                            <Text style={{ fontSize: 16 }}>3 <Text>đánh giá</Text> </Text>
                        </View>
                        <View style={styles.headerView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                            </View>
                            <Text style={{ fontSize: 16 }}>3 <Text>đánh giá</Text> </Text>
                        </View>
                        <View style={styles.headerView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                            </View>
                            <Text style={{ fontSize: 16 }}>3 <Text>đánh giá</Text> </Text>
                        </View>
                        <View style={styles.headerView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                                <Icon name="star-o" style={styles.radingIcon} />
                            </View>
                            <Text style={{ fontSize: 16 }}>3 <Text>đánh giá</Text> </Text>
                        </View>
                    </View>
                    <View style={styles.reivewFooter}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>4.5</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="star" style={styles.radingIconTQ} />
                            <Icon name="star" style={styles.radingIconTQ} />
                            <Icon name="star" style={styles.radingIconTQ} />
                            <Icon name="star" style={styles.radingIconTQ} />
                            <Icon name="star" style={styles.radingIconTQ} />
                        </View>
                        <Text style={{ fontSize: 16 }}>Có <Text style={{ color: "#d70018", fontWeight: 'bold' }}>6</Text> đánh giá và nhận xét</Text>
                    </View>
                </View>
                <View style={styles.reviewList}>
                    <View style={styles.containerList}>
                        <View style={styles.listInfo}>
                            <TouchableOpacity style={styles.containerAvatar}>
                                <Image style={styles.avatar} source={require('../assets/images/avatar1.png')} resizeMode='cover' />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>Nguyễn Sao</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="clock-o" style={{ fontSize: 15 }} />
                                    <Text style={{ paddingLeft: 5 }}>27/07/2024</Text>
                                </View>
                            </View>
                        </View>
                        <Text>Nhân viên nhiệt tình thân thiện, dễ thương . Hẹn có dịp sẽ ủng hộ tiếp ????????????
                        </Text>
                        <View style={styles.reviewIcon}>
                            <Icon name="star" style={{ fontSize: 18, color: '#FFD700' }} />
                            <Text style={{ fontWeight: 'bold', paddingLeft: 5 }}>5</Text>
                        </View>
                    </View>

                    <View style={styles.containerList}>
                        <View style={styles.listInfo}>
                            <TouchableOpacity style={styles.containerAvatar}>
                                <Image style={styles.avatar} source={require('../assets/images/avatar1.png')} resizeMode='cover' />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>Nguyễn Sao</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="clock-o" style={{ fontSize: 15 }} />
                                    <Text style={{ paddingLeft: 5 }}>27/07/2024</Text>
                                </View>
                            </View>
                        </View>
                        <Text>Nhân viên nhiệt tình thân thiện, dễ thương . Hẹn có dịp sẽ ủng hộ tiếp ????????????
                        </Text>
                        <View style={styles.reviewIcon}>
                            <Icon name="star" style={{ fontSize: 18, color: '#FFD700' }} />
                            <Text style={{ fontWeight: 'bold', paddingLeft: 5 }}>5</Text>
                        </View>
                    </View>

                    <View style={styles.containerList}>
                        <View style={styles.listInfo}>
                            <TouchableOpacity style={styles.containerAvatar}>
                                <Image style={styles.avatar} source={require('../assets/images/avatar1.png')} resizeMode='cover' />
                            </TouchableOpacity>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>Nguyễn Sao</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="clock-o" style={{ fontSize: 15 }} />
                                    <Text style={{ paddingLeft: 5 }}>27/07/2024</Text>
                                </View>
                            </View>
                        </View>
                        <Text>Nhân viên nhiệt tình thân thiện, dễ thương . Hẹn có dịp sẽ ủng hộ tiếp ????????????
                        </Text>
                        <View style={styles.reviewIcon}>
                            <Icon name="star" style={{ fontSize: 18, color: '#FFD700' }} />
                            <Text style={{ fontWeight: 'bold', paddingLeft: 5 }}>5</Text>
                        </View>
                    </View>


                </View>
                <View style={styles.reviewWrite}>
                    <TouchableOpacity style={{
                        flexDirection: 'row', borderWidth: 1, borderColor: "#d70018",
                        alignItems: 'center', borderRadius: 10, padding: 10
                    }} onPress={toggleModal}>
                        <Icon name='pencil' style={{ fontSize: 20, paddingRight: 5, color: "#d70018" }} />
                        <Text style={{ fontSize: 16, color: "#d70018" }}>Gửi đánh giá</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={toggleModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={{ color: '#FFF', fontSize: 18 }}>Đánh giá của bạn</Text>
                            <TouchableOpacity
                                onPress={toggleModal}>
                                <Icon name="close" style={{ color: '#CCC', fontSize: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <View style={styles.contentHeader} >
                                <Text style={styles.modalTitle}>Bạn cảm thấy <Text>iPhone 15 256GB - Chính hãng VN/A</Text> như thế nào?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {renderStars()}
                                </View>
                            </View>
                            <View style={styles.containerMain}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View >
                                        <Text>Họ & Tên</Text>
                                        <TextInput style={styles.input} />
                                    </View>
                                    <View>
                                        <Text>Số điện thoại</Text>
                                        <TextInput style={styles.input} />
                                    </View>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Đánh giá của bạn</Text>
                                    <TextInput style={styles.inputReview} />
                                </View>
                                <TouchableOpacity style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    containerReview: {
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#CCC',
        borderWidth: 1,
    },
    tableReview: {
        padding: 10,
    },
    reivewHeader: {
        backgroundColor: '#F7F7F7',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 5,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },

    radingIcon: {
        color: "#d70018",
        marginRight: 5,
        fontSize: 18
    },
    radingReview: {
        color: "#d70018",
        marginRight: 5,
        fontSize: 22
    },
    radingIconTQ: {
        color: "#FFD700",
        marginRight: 5,
        fontSize: 20
    },
    reivewFooter: {
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderTopWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        justifyContent: 'space-between',
        height: 120,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    reviewList: {
        marginTop: 10,
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    containerList: {
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    listInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,

    },
    containerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#CCC',
        overflow: 'hidden',
    },
    avatar: {
        height: '100%',
        width: '100%',
    },

    reviewIcon: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 2,
        width: 40,
        borderWidth: 1,
        shadowColor: '#CCC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'absolute',
        right: 0,
        margin: 15
    },
    reviewWrite: {
        alignItems: 'center',
        marginBottom: 20
    },


    // Đánh giá
    modalContainer: {
        flex: 1,
        paddingTop: 200,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Nền mờ cho modal
    },
    modalHeader: {
        width: '90%',
        backgroundColor: "#d70018",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15

    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15


    },
    contentHeader: {
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        alignItems: 'center',

    },
    modalTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    containerMain: {
        marginBottom: 16,
        width: '100%',
        marginTop: 10

    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        width: 150,
        padding: 5,
        borderRadius: 5,
    },
    inputReview: {
        borderColor: '#CCC',
        borderWidth: 1,
        width: '100%',
        padding: 5,
        borderRadius: 5,
        height: 40,

    },

    submitButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 50,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { Pressable } from 'react-native';
import OrderInfo from '../components/order/OrderInfo';
import OrderPayment from '../components/order/OrderPayment';
import OrderSuccess from './../components/order/OrderSuccess';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const order = useSelector((state) => state.order.order);
    console.log("order", order);

    const steps = [
        { id: 1, title: "Thông tin mua hàng", content: "Address Form" },
        { id: 2, title: "Hình thức thanh toán", content: "Delivery Options" },
        { id: 3, title: "Đặt hàng thành công", content: "Order Summary" },
    ];
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    justifyContent: "space-between",
                }}
                >
                    {steps?.map((step, index) => (
                        <View key={index} style={{ justifyContent: "center", alignItems: "center", width: 80 }}>
                            {index > 0 && (
                                <View style={[{ flex: 1, height: 2, backgroundColor: "green" },
                                index <= currentStep && { backgroundColor: "green" },
                                ]}
                                />
                            )}
                            <View
                                style={[
                                    {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: "#ccc",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    },
                                    index < currentStep && { backgroundColor: "green" },
                                ]}
                            >
                                {index < currentStep ? (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text style={{ textAlign: "center", marginTop: 8 }}>
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>




            {currentStep == 1 && (
                <OrderInfo setCurrentStep={setCurrentStep} />
            )}

            {currentStep == 2 && (
                <OrderPayment setCurrentStep={setCurrentStep} />
            )}

            {currentStep == 3 && (
                <OrderSuccess setCurrentStep={setCurrentStep} />
            )}


        </>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})
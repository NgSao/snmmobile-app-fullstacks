import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductScreen from '../screens/ProductScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import OrderScreen from './../screens/OrderScreen';
import Toast from 'react-native-toast-message';
import WishListScreen from './../screens/WishListScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import TestPaypal from './../screens/TestPaypal';
import RegisterScreen from './../screens/RegisterScreen';
import VnPay from './../components/payment/VnPay';
import PayPal from '../components/payment/PayPal';
import ZaloPay from './../components/payment/ZaloPay';
import Momo from './../components/payment/Momo';
import ChatScreen from './../screens/ChatScreen';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function MyTabs() {
        return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#d70018',
                tabBarInactiveTintColor: 'black',
            }}>
                <Tab.Screen name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="home-sharp" size={24} color="#d70018" />
                        ) : (
                            <Ionicons name="home-outline" size={24} color="black" />
                        ),
                        tabBarLabelStyle: ({ focused }) => ({
                            color: focused ? '#d70018' : 'red',
                        }),
                    }} />
                <Tab.Screen name='WishList'
                    component={WishListScreen}
                    options={{
                        tabBarLabel: "WishList", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="heart" size={24} color="#d70018" />
                        ) : (
                            <Ionicons name="heart-outline" size={24} color="black" />
                        ),
                        tabBarLabelStyle: ({ focused }) => ({
                            color: focused ? '#d70018' : 'red',
                        }),
                    }} />
                <Tab.Screen name='Cart'
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="cart" size={24} color="#d70018" />) : (
                            <Ionicons name="cart-outline" size={24} color="black" />)
                    }} />
                <Tab.Screen name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="person" size={24} color="#d70018" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        )
                    }} />
            </Tab.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailScreen" component={ProductDetailScreen} options={{ headerShown: false }} />
            {/* Cart */}
            <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
            {/* Profile */}
            <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Coupon" component={TestPaypal} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VnPay" component={VnPay} options={{ headerShown: false }} />
            <Stack.Screen name="PayPal" component={PayPal} options={{ headerShown: false }} />
            <Stack.Screen name="ZaloPay" component={ZaloPay} options={{ headerShown: false }} />
            <Stack.Screen name="MoMo" component={Momo} options={{ headerShown: false }} />

            {/* Chat */}
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export default StackNavigator;

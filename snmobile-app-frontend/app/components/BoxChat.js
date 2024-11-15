
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const BoxChat = () => {
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            {expanded && (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.zaloButton]}
                    >
                        <Image source={require('../assets/images/zalo.jpeg')} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { Linking.openURL("https://www.facebook.com/messages/t/100070104164297") }}
                    >
                        <Image source={require('../assets/images/message.jpg')} resizeMode='contain' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { Linking.openURL('tel:0392445255'); }}
                    >
                        <Icon name="phone" size={24} color="green" />
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity
                style={[styles.button, styles.expandButton]}
                onPress={handlePress}>
                {expanded ? (
                    <Icon name="close" size={24} color="#FFF" />
                ) : (
                    <View style={styles.iconContainer}>
                        {[...Array(3).keys()].map(index => (
                            <MotiView
                                from={{ opacity: 0.7, scale: 1 }}
                                animate={{ opacity: 0, scale: 4 }}
                                transition={{
                                    type: 'timing',
                                    duration: 2000,
                                    easing: Easing.out(Easing.ease),
                                    delay: index * 400,
                                    loop: true,
                                    repeatReverse: false,
                                }}
                                key={index}
                                style={[StyleSheet.absoluteFillObject, styles.circleEffect]}
                            />
                        ))}
                        <Icon name="chat" size={24} color="#FFF" />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default BoxChat;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        top: 570,
        alignItems: 'flex-end',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        marginVertical: 5,
        borderRadius: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    expandButton: {
        backgroundColor: '#d70018',
    },
    icon: {
        width: 28,
        height: 28,
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 60,
        right: 0,
        alignItems: 'center',
    },
    zaloButton: {
        backgroundColor: '#FFF',
    },
    circleEffect: {
        borderRadius: 40,
        backgroundColor: '#d70018'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

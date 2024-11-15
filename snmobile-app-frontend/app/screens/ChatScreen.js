import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';

function ChatScreen() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();

    useEffect(() => {
        const socket = new WebSocket('ws://192.168.1.111:8080/myhandler');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            console.log('Received:', event.data);
            setMessages(prevMessages => [
                ...prevMessages,
                { type: 'admin', text: event.data }
            ]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const timestamp = new Date().toLocaleString();
            setMessages(prevMessages => [
                ...prevMessages,
                { type: 'user', text: message, timestamp }
            ]);
            setMessage('');
            Keyboard.dismiss();
        }
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.icon}>👤</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Chat SNMobile</Text>
                        <View style={styles.settings}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.icon}>⚙️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView ref={scrollViewRef} style={styles.messageContainer} contentContainerStyle={styles.scrollContent}>
                        {messages.map((msg, index) => (
                            <View key={index} style={msg.type === 'user' ? styles.sentMessageContainer : styles.receivedMessageContainer}>
                                <View style={msg.type === 'user' ? styles.sentMessage : styles.receivedMessage}>
                                    <Text style={styles.messageText}>{msg.text}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            value={message}
                            onChangeText={setMessage}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        backgroundColor: '#3b82f6',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#2563eb',
    },
    icon: {
        color: '#fff',
        fontSize: 20,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    settings: {
        position: 'relative',
        display: 'inline-block',
    },
    messageContainer: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    sentMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    sentMessage: {
        backgroundColor: '#bfdbfe',
        padding: 12,
        borderRadius: 16,
        maxWidth: '75%',
    },
    receivedMessageContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    receivedMessage: {
        backgroundColor: '#e5e7eb',
        padding: 12,
        borderRadius: 16,
        maxWidth: '75%',
    },
    messageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginBottom: 50,
    },
    input: {
        flex: 1,
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChatScreen;

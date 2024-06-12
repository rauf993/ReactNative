import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { GoogleGenerativeAI } from '@google/generative-ai';



import axios from "axios"; 


const ChatGPT = () => {
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');

const API_KEY = '';


    const handleGenericAPIRequest = async (message) => {
      try {
        if (!message.trim()) return; //if the message is empty  don't do anything
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: message }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();
        console.log("La respuesta es: " + text);
      

        // in this part i update the dates 
        setData(prevData => [
          ...prevData,
          { type: 'user', content: message },
          { type: 'CR7', content: text }
        ]);

        setTextInput('');
      } catch (error) {
        console.error('ERROR: ', error);
      }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>IA</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'colum', padding: 10 }}> 
                        <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
                            {item.type === 'user' ? 'rauf: ' : 'CR7: '}
                        </Text>
                        <Text style={styles.bot}>{item.content}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={text => setTextInput(text)}
                placeholder="Ask me anything"
            />
            <TouchableOpacity style={styles.button} onPress={() => handleGenericAPIRequest(textInput)}>
                <Text style={styles.buttonText}>Let's go</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcc9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 70
    },
    bot: {
        fontSize: 16,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 70,
        marginBottom: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'yellow',
        width: '90%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }
});

export default ChatGPT;

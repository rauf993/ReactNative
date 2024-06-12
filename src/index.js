import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";



import axios from "axios"; 


const ChatGPT = () => {
    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');



    const handleGenericAPIRequest = async (message) => {
      try {
        if (!message.trim()) return; //if the message is empty  don't do anything

        // create a object
        const dataToSend = {
          model: "gpt-3.5-turbo",// here i choose the model of chatgpt 
          messages: [{ role: 'user', content: message }],
        };

        // i get the dates 
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

            'Authorization': ``, // its my api Key , for segurity i don't put mi api key in my git hub jeje
  
          
          },
          body: JSON.stringify(dataToSend),
        });

        const completion = await response.json();
        const answer = completion.choices[0].message.content;

        // in this part i update the dates 
        setData(prevData => [
          ...prevData,
          { type: 'user', content: message },
          { type: 'CR7', content: answer }
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

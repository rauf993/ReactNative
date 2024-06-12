
import { StyleSheet, Text, View } from 'react-native';
//import ChatGPT from "./src"
//import Dance from "./src/dance" 
import ChatGPT from './src/index';

export default function App() {
     
  return (
    <View style={styles.container}>
      <ChatGPT/>
    </View>
    
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});


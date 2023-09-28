/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import {Alert, Button, SafeAreaView, View} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {}, []);
  const ws = new WebSocket('ws://10.0.2.2:3000/websocket');

  ws.onmessage = event => {
    Alert.alert(JSON.stringify(event.data));
  };

  ws.onclose = e => {
    console.log(e);
  };
  ws.onerror = e => {
    console.log(e);
  };

  const sendSmallMessage = () => {
    ws.send('Small Message');
    console.log('Sent small Message');
  };

  const sendBigMessage = () => {
    const bigMessage = new Array(1024 * 1024 * 16 + 2).join('a');

    ws.send(bigMessage);
    console.log('Sent Big Message');
  };

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 400,
          height: 400,
        }}>
        <Button title="Send small Message" onPress={sendSmallMessage} />
        <Button onPress={sendBigMessage} title="Send big message" />
      </View>
    </SafeAreaView>
  );
}

export default App;

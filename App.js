import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import Router from './Container/Router';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    NanumSquareLight: require('./assets/fonts/NanumSquare-Light.ttf'),
    NanumSquareRegular: require('./assets/fonts/NanumSquare-Regular.ttf'),
    NanumSquareBold: require('./assets/fonts/NanumSquare-Bold.ttf'),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000)
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <>
      {isReady ? (
        <Router />
      ) : (
        <View>
          <Text>1</Text>
        </View>
      )}
    </>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    async function loadFontAndPrepare() {
      await Font.loadAsync({
        'BeautifulPeople': require('../assets/fonts/BeautifulPeoplePersonalUse-dE0g.ttf')
      });
      setFontLoaded(true);
    }
    loadFontAndPrepare();
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        navigation.replace('Auth');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [fontLoaded, fadeAnim, navigation]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>
          <Text style={styles.barber}>Barber</Text>
          <Text style={styles.factory}>Factory</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'BeautifulPeople',
    color: '#3ec2f7',
    textShadowColor: 'rgba(62, 194, 247, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  barber: {
    fontSize: 50,
  },
  factory: {
    fontSize: 65,
  },
});

export default SplashScreen;

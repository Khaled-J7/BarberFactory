import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isBarber, setIsBarber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'BeautifulPeople': require('../../assets/fonts/BeautifulPeoplePersonalUse-dE0g.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handlePhoneNumberChange = (text) => {
    if (text.length <= 8) {
      setPhoneNumber(text);
    }
  };

  const renderForm = () => {
    if (isLogin) {
      return (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={24} color="#3ec2f7" style={styles.inputIcon} />
            <View style={styles.phoneInputWrapper}>
              <Text style={styles.phonePrefix}>+216</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                maxLength={8}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#3ec2f7" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={isBarber ? "cut-outline" : "person-outline"} size={24} color="#3ec2f7" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />
          </View>
          {isBarber && (
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={24} color="#3ec2f7" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Barbershop Name"
                placeholderTextColor="#999"
              />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={24} color="#3ec2f7" style={styles.inputIcon} />
            <View style={styles.phoneInputWrapper}>
              <Text style={styles.phonePrefix}>+216</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                maxLength={8}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#3ec2f7" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#3ec2f7" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={[styles.titleContainer, !isLogin && styles.titleContainerSignup]}>
          <Text style={styles.title}>
            <Text style={styles.barber}>Barber</Text>
            <Text style={styles.factory}>Factory</Text>
          </Text>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.tabButton, isLogin && styles.activeTab]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, !isLogin && styles.activeTab]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {!isLogin && (
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, !isBarber && styles.activeUserType]}
              onPress={() => setIsBarber(false)}
            >
              <Ionicons name="person" size={24} color={isBarber ? "#3ec2f7" : "#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userTypeButton, isBarber && styles.activeUserType]}
              onPress={() => setIsBarber(true)}
            >
              <Ionicons name="cut" size={24} color={isBarber ? "#fff" : "#3ec2f7"} />
            </TouchableOpacity>
          </View>
        )}
        {renderForm()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f3',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
   titleContainer: {
    marginBottom: 30,
  },
  titleContainerSignup: {
    marginBottom: 10,
  },
  title: {
    fontFamily: 'BeautifulPeople',
    color: '#3ec2f7',
    textShadowColor: 'rgba(62, 194, 247, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  barber: {
    fontSize: 40,
  },
  factory: {
    fontSize: 55,
  },

  header: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#3ec2f7',
  },
  tabText: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#3ec2f7',
  },
  activeTabText: {
    color: '#fff',
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  userTypeButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeUserType: {
    backgroundColor: '#3ec2f7',
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#333',
  },
  phoneInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phonePrefix: {
    color: '#3ec2f7',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#333',
  },
  button: {
    backgroundColor: '#3ec2f7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#141414',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
});

export default AuthScreen;

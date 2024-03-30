import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import {Picker} from'@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import baseURL from '../auth/connection';

const Login = () => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      let apiUrl = '';
      if (userType === 'student') {
        apiUrl = `${baseURL}/api/studentLogin`;
      } else if (userType === 'admin') {
        apiUrl = `${baseURL}/api/adminLogin`;
      }

      const response = await axios.post(apiUrl, {
        registerNumber: registerNumber,
        password: password
      });

      if (response.data.success) {
        console.log('Login successful');
        if (userType === 'student') {
          navigation.navigate('StudentDashboard'); // Navigate to StudentDashboard if userType is student
        } else if (userType === 'admin') {
          navigation.navigate('Dashboard'); // Navigate to AdminDashboard if userType is admin
        }
      } else {
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Register Number"
        value={registerNumber}
        onChangeText={text => setRegisterNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Picker
        selectedValue={userType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}>
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width:'80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 15,
  },
});

export default Login;
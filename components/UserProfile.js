import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import baseURL from '../auth/connection'; // Import baseURL from connection file

const UserProfile = ({ onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');

  const handleSubmit = async () => {
    try {
      const userData = { name, department, year, section };
      await axios.post(`${baseURL}/api/addProfile`, userData);
      console.log('Profile added successfully!');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Picker
        style={styles.input}
        selectedValue={department}
        onValueChange={setDepartment}
      >
        <Picker.Item label="Select Department" value="" />
        <Picker.Item label="CSE" value="CSE" />
        <Picker.Item label="IT" value="IT" />
        <Picker.Item label="AIDS" value="AIDS" />
        <Picker.Item label="CSBS" value="CSBS" />
        <Picker.Item label="MECH" value="MECH" />
        <Picker.Item label="S&H" value="S&H" />
        <Picker.Item label="GENERAL" value="GENERAL" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={year}
        onValueChange={setYear}
      >
        <Picker.Item label="Select Year" value="" />
        <Picker.Item label="I" value="I" />
        <Picker.Item label="II" value="II" />
        <Picker.Item label="III" value="III" />
        <Picker.Item label="IV" value="IV" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={section}
        onValueChange={setSection}
      >
        <Picker.Item label="Select Section" value="" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default UserProfile;

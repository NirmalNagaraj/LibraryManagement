import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import {Picker} from'@react-native-picker/picker'
import baseURL from '../auth/connection';

const AddForm = ({ onSubmit }) => {
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [date, setDate] = useState(new Date());
  const [bookDescription, setBookDescription] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(''); 
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleSubmit = async () => {
    try {
      
      const formattedDate = date.toISOString().split('T')[0];

      
      const response = await axios.post(`${baseURL}/bookdetails`, {
        bookName,
        bookAuthor,
        date: formattedDate, 
        bookDescription,
        department: selectedDepartment, 
      });

      console.log('Response:', response.data);

      setBookName('');
      setBookAuthor('');
      setDate(new Date());
      setBookDescription('');
      setSelectedDepartment('');

      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Book</Text>
      <TextInput
        style={styles.input}
        placeholder="Book Name"
        value={bookName}
        onChangeText={text => setBookName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Book Author"
        value={bookAuthor}
        onChangeText={text => setBookAuthor(text)}
      />
      <Picker
        selectedValue={selectedDepartment}
        onValueChange={(itemValue, itemIndex) => setSelectedDepartment(itemValue)}
        style={styles.input}
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
      {Platform.OS === 'ios' && showDatePicker && (
        <DatePickerIOS
          date={date}
          onDateChange={newDate => setDate(newDate)}
          mode="date"
        />
      )}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Book Description"
        value={bookDescription}
        onChangeText={text => setBookDescription(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
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
});

export default AddForm;
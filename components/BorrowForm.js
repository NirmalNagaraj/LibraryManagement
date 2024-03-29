import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-modern-datepicker';

const BorrowForm = ({ onSubmit }) => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [fromDate, setFromDate] = useState(null); // Updated state to handle date
  const [toDate, setToDate] = useState('');
  const [bookName, setBookName] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/borrowbooks', {
        registerNumber,
        fromDate,
        toDate,
        bookName,
      });

      console.log('Response:', response.data);

      setRegisterNumber('');
      setFromDate(null); // Reset date after submission
      setToDate('');
      setBookName('');

      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borrow Book</Text>
      <TextInput
        style={styles.input}
        placeholder="Register Number"
        value={registerNumber}
        onChangeText={text => setRegisterNumber(text)}
      />
      {/* Date picker for selecting from date */}
      <DatePicker
        style={styles.input}
        mode="calendar"
        onSelectedChange={date => setFromDate(date)}
        minimumDate={new Date()} // Prevent selecting past dates
        placeholder="Select From Date"
      />
      <TextInput
        style={styles.input}
        placeholder="Book Name"
        value={bookName}
        onChangeText={text => setBookName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
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

export default BorrowForm;

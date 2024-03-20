import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import axios from 'axios'; // Import Axios

const AddForm = ({ onSubmit }) => {
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [date, setDate] = useState(new Date());
  const [bookDescription, setBookDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
  try {
    // Format date to SQL compatible format (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];
    
    // Send POST request to the API with form data
    const response = await axios.post('http://localhost:5000/bookdetails', {
      bookName,
      bookAuthor,
      date: formattedDate, // Use formatted date
      bookDescription
    });
    
    // Handle response if needed
    console.log('Response:', response.data);
    
    // Clear form fields after successful submission
    setBookName('');
    setBookAuthor('');
    setDate(new Date());
    setBookDescription('');

    onSubmit();
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle error if needed
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

import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import baseURL from '../auth/connection';

const Dues = () => {
  const [dues, setDues] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/getDues`) // Use baseURL for API call
      .then(response => {
        setDues(response.data);
      })
      .catch(error => {
        console.error('Error fetching dues:', error);
      });
  }, []);

  const handleReturnBook = async (bookName) => {
    try {
      await axios.post(`${baseURL}/api/returnBook`, { bookName });
      console.log('Book returned successfully:', bookName);
      // Optionally, you can update the dues list after successful return
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dues</Text>
      {dues.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{item.BookName}</Text>
          <Text>Due Date: {moment(item.ToDate).format('MMMM DD, YYYY')}</Text>
          <Button title="Return" onPress={() => handleReturnBook(item.BookName)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Dues;

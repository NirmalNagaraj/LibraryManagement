import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import BorrowForm from './BorrowForm';

const BorrowBooks = () => {
  const [borrowModalVisible, setBorrowModalVisible] = useState(false);
  const [borrowList, setBorrowList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getborrowList')
      .then(response => {
        setBorrowList(response.data);
      })
      .catch(error => {
        console.error('Error fetching borrow list:', error);
      });
  }, []); 

  const handleBorrowButton = () => {
    setBorrowModalVisible(true);
  };

  const handleCloseModal = () => {
    setBorrowModalVisible(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleBorrowButton}>
        <Text style={styles.buttonText}>Borrow Book</Text>
      </TouchableOpacity>

      <Modal visible={borrowModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <BorrowForm onSubmit={() => handleCloseModal()} />
        </View>
      </Modal>

      {borrowList.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.noBooksText}>No books to display</Text>
        </View>
      ) : (
        borrowList.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.bookNameText}>{item.BookName}</Text>
              <Text style={styles.validityText}>Upto {formatDate(item.ToDate)}</Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    top: 120,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBooksText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    marginVertical: 10,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    // Increase the size of the card
    width: '100%',
  },
  bookNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  validityText: {
    fontSize: 16,
  },
});

export default BorrowBooks;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import axios from 'axios';
import BorrowForm from './BorrowForm';

const BorrowBooks = ({ onAddForm }) => {
  const [borrowData, setBorrowData] = useState(null);
  const [borrowModalVisible, setBorrowModalVisible] = useState(false);

  useEffect(() => {
    fetchBorrowData();
  }, []);

  const fetchBorrowData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/borrowbooks');
      setBorrowData(response.data);
    } catch (error) {
      console.error('Error fetching borrow data:', error);
    }
  };

  const handleBorrowButton = () => {
    setBorrowModalVisible(true);
  };

  const handleCloseModal = () => {
    setBorrowModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>BorrowBooks</Text>
      {borrowData ? (
        <Text>{/* Display table data here */}</Text>
      ) : (
        <Text>Nothing to display</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={onAddForm}>
        <Text style={styles.buttonText}>Add Form</Text>
      </TouchableOpacity>

      {/* Borrow Modal */}
      <Modal visible={borrowModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          {/* Add borrow component content here */}
          <BorrowForm />
        </View>
      </Modal>
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
    marginTop: 20,
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
});

export default BorrowBooks;

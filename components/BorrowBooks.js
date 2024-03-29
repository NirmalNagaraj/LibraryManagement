import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import BorrowForm from './BorrowForm'; // Import BorrowForm component
import Timepicker from './Timepicker';

const BorrowBooks = () => {
  const [borrowModalVisible, setBorrowModalVisible] = useState(false);

  // Function to handle opening the BorrowForm modal
  const handleBorrowButton = () => {
    setBorrowModalVisible(true);
  };

  // Function to handle closing the BorrowForm modal
  const handleCloseModal = () => {
    setBorrowModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>BorrowBooks</Text>
      {/* Button to open BorrowForm modal */}
      <TouchableOpacity style={styles.addButton} onPress={handleBorrowButton}>
        <Text style={styles.buttonText}>Borrow Book</Text>
      </TouchableOpacity>
      <Timepicker />

      {/* BorrowForm Modal */}
      <Modal visible={borrowModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
         
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          {/* BorrowForm component */}
          <BorrowForm  />
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

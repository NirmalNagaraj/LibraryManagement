// StudentDashboard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import BorrowBooks from '../components/BorrowBooks'; // Import BorrowBooks component
import BorrowForm from '../components/BorrowForm';

const StudentDashboard = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showBorrowForm, setShowBorrowForm] = useState(false); // State to control the Borrow form modal
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control the sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar state
  };

  const handleBorrowForm = () => {
    setShowBorrowForm(true); // Show the Borrow form modal
    setSidebarOpen(false); // Close the sidebar when Borrow form is opened
  };

  const handleSidebarLinkClick = (action) => {
    setSelectedAction(action); // Set the selected action
    setSidebarOpen(false); // Close the sidebar when a link is clicked
  };

  return (
    <View style={styles.container}>
      {/* Hamburger menu */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Sidebar */}
      <Modal visible={sidebarOpen} transparent={true} animationType="slide">
        <View style={styles.sidebar}>
          {/* Close button for sidebar */}
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          {/* Sidebar content */}
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('books')}>
            <Ionicons name="book-outline" size={24} color="black" />
            <Text style={styles.linkText}>Books</Text>
          </TouchableOpacity>
          {/* Add more sidebar links as needed */}
        </View>
      </Modal>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Content based on selected action */}
        {selectedAction === 'books' && <BorrowBooks onAddForm={handleBorrowForm} />} 
        {/* Add more conditional rendering based on the selected action */}
      </View>

      {/* Modal for Borrow form */}
      <Modal visible={showBorrowForm} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowBorrowForm(false)}>
            <Ionicons name="close-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          {/* Render the Borrow form */}
          <BorrowForm onSubmit={() => setShowBorrowForm(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menuButton: {
    marginLeft: 10,
    marginTop: 10,
  },
  sidebar: {
    width: 200,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 1, // Ensure sidebar is above other content
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  sidebarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  linkText: {
    fontSize: 12,
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudentDashboard;

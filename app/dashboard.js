// Dashboard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddForm from '../components/AddForm';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (value) => {
    console.log('Submitted value:', value);
    setShowForm(false); // Close the form modal
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Sticky sidebar with links */}
        <View style={styles.sidebarLinks}>
          {/* Add icon and link */}
          <TouchableOpacity style={styles.sidebarLink}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
            <Text style={styles.linkText}>Add</Text>
          </TouchableOpacity>
          {/* Delete icon and link */}
          <TouchableOpacity style={styles.sidebarLink}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.linkText}>Delete</Text>
          </TouchableOpacity>
          {/* Search icon and link */}
          <TouchableOpacity style={styles.sidebarLink}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Text style={styles.linkText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Button for adding */}
        <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        {/* Add other content here */}
      </View>

      {/* Modal for form */}
      <Modal visible={showForm} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowForm(false)}>
            <Ionicons name="close-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <AddForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
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
  sidebar: {
    width: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
  },
  sidebarLinks: {
    marginTop: 20,
    alignItems: 'center',
  },
  sidebarLink: {
    marginBottom: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;

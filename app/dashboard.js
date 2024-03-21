// Dashboard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import AddComponent from '../components/AddComponent';
import AddForm from '../components/AddForm'; // Import the AddForm component
import DeleteComponent from '../components/DeleteComponent';
import SearchComponent from '../components/SearchComponent';

const Dashboard = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // State to control the Add form modal
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control the sidebar visibility

  const handleAddForm = () => {
    setShowAddForm(true); // Show the Add form modal
    setSidebarOpen(false); // Close the sidebar when Add form is opened
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar state
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
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('add')}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
            <Text style={styles.linkText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('delete')}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.linkText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('search')}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Text style={styles.linkText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Content based on selected action */}
        {selectedAction === 'add' && <AddComponent onAddForm={handleAddForm} />}
        {selectedAction === 'delete' && <DeleteComponent />}
        {selectedAction === 'search' && <SearchComponent />}
      </View>

      {/* Modal for Add form */}
      <Modal visible={showAddForm} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowAddForm(false)}>
            <Ionicons name="close-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <AddForm onSubmit={() => setShowAddForm(false)} />
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

export default Dashboard;




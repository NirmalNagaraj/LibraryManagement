// AddComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddComponent = ({ onAddForm }) => {
  return (
    <View style={styles.container}>
      <Text>Add Component</Text>
      {/* Render the Add form button */}
      <TouchableOpacity style={styles.addButton} onPress={onAddForm}>
        <Text style={styles.buttonText}>Add Form</Text>
      </TouchableOpacity>
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
});

export default AddComponent;
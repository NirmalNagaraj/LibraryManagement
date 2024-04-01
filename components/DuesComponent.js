import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection'; // Import baseURL from the connection file

const DuesComponent = () => {
  const [duesList, setDuesList] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${baseURL}/api/duesList`)
      .then(response => {
        setDuesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching dues list:', error);
      });
  }, []); // Run once on component mount

  // Function to format the date (e.g., "18.04.2024" to "April 18, 2024")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dues List</Text>
      {duesList.length === 0 ? (
        <Text>No dues to display</Text>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Book Name</Text>
            <Text style={styles.headerCell}>Register Number</Text>
            <Text style={styles.headerCell}>Due Date</Text>
          </View>
          {duesList.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.BookName}</Text>
              <Text style={styles.cell}>{item.RegisterNumber}</Text>
              <Text style={styles.cell}>{formatDate(item.ToDate)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});

export default DuesComponent;

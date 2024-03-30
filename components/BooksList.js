import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/booksdetails`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup code here (if needed)
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView} horizontal={true}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              
              <Text style={[styles.headerCell, styles.cellWidth20]}>Book Name</Text>
              <Text style={[styles.headerCell, styles.cellWidth15]}>Published Date</Text>
              <Text style={[styles.headerCell, styles.cellWidth10]}>Domain</Text>
            </View>
            {books.map((book) => (
              <View key={book.BookID} style={styles.tableRow}>
                <Text style={[styles.cell, styles.cellWidth20]}>{book.BookName}</Text>
                <Text style={[styles.cell, styles.cellWidth15]}>{book.PublishedDate}</Text>
                <Text style={[styles.cell, styles.cellWidth10]}>{book.Department}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: windowWidth < 600 ? 24 : 32, // Set font size based on screen width
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  table: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  headerCell: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: windowWidth < 600 ? 16 : 20, // Set font size based on screen width
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: windowWidth < 600 ? 16 : 20, // Set font size based on screen width
  },
  cellWidth10: {
    width: '10%',
  },
  cellWidth20: {
    width: '20%',
  },
  cellWidth15: {
    width: '15%',
  },
  cellWidth25: {
    width: '25%',
  },
});

export default BooksList;

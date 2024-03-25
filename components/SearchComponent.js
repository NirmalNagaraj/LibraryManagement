import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Students');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', {
        searchText,
        selectedFilter
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Picker
          style={styles.filterPicker}
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="Students" value="Students" />
          <Picker.Item label="Books" value="Books" />
        </Picker>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultText}>You are searching for "{searchText}" in {selectedFilter}</Text>
      {searchResults.map((result) => (
        <View key={result.id} style={styles.profileCard}>
          <Text>Name: {result.name}</Text>
          <Text>Email: {result.email}</Text>
          {/* Add additional fields based on the table structure */}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterPicker: {
    width: 120,
    height: 40,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default SearchComponent;

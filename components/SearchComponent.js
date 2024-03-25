import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity, FlatList } from 'react-native';
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

  const formatPublishedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date according to local settings
  };

  const renderCard = (item) => {
    return (
      <View style={styles.card}>
        {Object.entries(item).map(([key, value]) => (
          <View key={key} style={styles.cardRow}>
            <Text style={styles.cardKey}>{key}</Text>
            <Text style={styles.cardValue}>{key === 'PublishedDate' ? formatPublishedDate(value) : value}</Text>
          </View>
        ))}
      </View>
    );
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
      <FlatList
        data={searchResults}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(item, index) => index.toString()}
      />
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
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardKey: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  cardValue: {
    flex: 1,
  },
});

export default SearchComponent;

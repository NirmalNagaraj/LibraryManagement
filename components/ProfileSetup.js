import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import UserProfile from './UserProfile';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ProfileSetup = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleSetupClick = () => {
    setShowUserProfile(true);
  };

  const handleProfileSubmit = () => {
    setShowUserProfile(false);
    navigation.navigate('StudentDashboard'); // Redirect to StudentDashboard
  };

  return (
    <View style={styles.container}>
      <Text>Looks like you didn't complete setting up your profile.</Text>
      <Button title="Setup" onPress={handleSetupClick} />

      <Modal visible={showUserProfile} animationType="slide">
        <UserProfile onSubmitSuccess={handleProfileSubmit} />
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
});

export default ProfileSetup;

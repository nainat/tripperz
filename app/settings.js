import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
  Entypo,
} from '@expo/vector-icons';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>SETTINGS</Text>
          <MaterialIcons name="logout" size={24} color="#000" />
        </View>

        {/* Profile */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="user-circle-o" size={22} color="#000" />
            <Text style={styles.cardTitle}>Profile</Text>
            <Feather name="camera" size={20} style={styles.cardIcon} />
          </View>
          <Text style={styles.cardItem}>Change Profile Picture</Text>
          <Text style={styles.cardItem}>Edit Name</Text>
          <Text style={styles.cardItem}>Edit Personal Details</Text>
        </View>

        {/* Privacy */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="lock" size={22} color="#000" />
            <Text style={styles.cardTitle}>Privacy</Text>
          </View>
          <Text style={styles.cardItem}>Change Password</Text>
          <Text style={styles.cardItem}>Login History</Text>
          <Text style={styles.cardItem}>Two Factor Authentication</Text>
        </View>

        {/* Notifications */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
            <Text style={styles.cardTitle}>Notifications</Text>
          </View>
          <Text style={styles.cardItem}>Receive message notifications</Text>
          <Text style={styles.cardItem}>Receive Email Alerts</Text>
          <Text style={styles.cardItem}>Receive updates on traffic, weather...</Text>
        </View>

        {/* Theme and Customization */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Entypo name="palette" size={22} color="#000" />
            <Text style={styles.cardTitle}>Theme and Customization</Text>
          </View>
          <Text style={styles.cardItem}>Change Background Color</Text>
          <Text style={styles.cardItem}>Change Display (light/dark mode)</Text>
          <Text style={styles.cardItem}>Change Font Size</Text>
        </View>

        {/* Language */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="language" size={22} color="#000" />
            <Text style={styles.cardTitle}>Language</Text>
          </View>
          <Text style={styles.cardItem}>Set default language</Text>
          <Text style={styles.cardItem}>Add new language</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
     
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    content: {
      padding: 20,
      paddingBottom: 100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    cardTitle: {
      marginLeft: 10,
      fontWeight: 'bold',
      fontSize: 16,
    },
    cardIcon: {
      marginLeft: 'auto',
    },
    cardItem: {
      fontSize: 14,
      color: '#555',
      marginLeft: 32,
      marginBottom: 4,
    },
    bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
    },
  });
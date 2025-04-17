import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Ionicons name="menu" size={24} color="#4B2E2E" />
        <Text style={styles.greeting}>Hello Naina!</Text>
        <View style={styles.icons}>
          <Ionicons name="notifications-outline" size={24} color="#4B2E2E" style={styles.icon} />
          <FontAwesome name="user-circle-o" size={26} color="#4B2E2E" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for places, bookings, etc"
        />
      </View>

      {/* Banner */}
      <Image
        source={{ uri: 'https://www.holidify.com/images/bgImages/MANALI.jpg' }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Quick Tools */}
      <View style={styles.toolsContainer}>
        {['book', 'translate', 'map', 'shield', 'passport'].map((tool, index) => (
          <Image
            key={index}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' }}
            style={styles.toolIcon}
          />
        ))}
      </View>

      {/* Recommended Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <View style={styles.recommendContainer}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Taj_Mahal_%28Edited%29.jpg' }}
            style={styles.recommendImage}
          />
          <Image
            source={{ uri: 'https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/08/Rajasthan.jpg' }}
            style={styles.recommendImage}
          />
        </View>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreText}>Explore places</Text>
        </TouchableOpacity>
      </View>

      {/* Current Journey */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your current journey...</Text>
        <Image
          source={{ uri: 'https://i.imgur.com/UYiroysl.jpg' }}
          style={styles.journeyImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6f0',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B2E2E',
  },
  icons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 16,
    alignItems: 'center',
    elevation: 2,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginBottom: 16,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toolIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  section: {
    backgroundColor: '#f8e0d4',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#4B2E2E',
  },
  recommendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendImage: {
    width: '48%',
    height: 100,
    borderRadius: 10,
  },
  exploreButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  exploreText: {
    fontWeight: 'bold',
    color: '#4B2E2E',
  },
  journeyImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});
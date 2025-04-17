import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';

const location = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
        style={styles.header}
        resizeMode="cover"
      >
        <Text style={styles.headerTitle}>Popular Summer Spots</Text>
        <Text style={styles.headerSubtitle}>Top 10 places to visit during summer</Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read more</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPLORE PLACES</Text>

        {/* Nature Sights */}
        <Text style={styles.subTitle}>Nature Sights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { name: 'Kerala', image: 'https://images.unsplash.com/photo-1603575448361-bbbf86b0fca5' },
            { name: 'Pondicherry', image: 'https://images.unsplash.com/photo-1627202714632-3f0e17129d2d' },
            { name: 'Thrivandrum', image: 'https://images.unsplash.com/photo-1605708501449-f94f287263a9' },
          ].map((place, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: place.image }} style={styles.cardImage} />
              <Text style={styles.cardText}>{place.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Architecture Wonders */}
        <Text style={styles.subTitle}>Architecture Wonders</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1607697937993-e0e5aa2646f2' },
            { name: 'Agra', image: 'https://images.unsplash.com/photo-1586511925554-d1fc4eb9f9cc' },
            { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1559118496-3c3f0a6ee478' },
          ].map((place, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: place.image }} style={styles.cardImage} />
              <Text style={styles.cardText}>{place.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Religious Trips */}
        <Text style={styles.subTitle}>Religious Trips</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { name: 'MahaKumbh', image: 'https://images.unsplash.com/photo-1585241936936-befb5e697a58' },
            { name: 'Thirupathi', image: 'https://images.unsplash.com/photo-1607762807215-06b3d8d4312d' },
            { name: 'CharDham', image: 'https://images.unsplash.com/photo-1610533188420-b0c78faec9fb' },
          ].map((place, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: place.image }} style={styles.cardImage} />
              <Text style={styles.cardText}>{place.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5e6da',
  },
  header: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#eee',
    marginTop: 6,
    fontSize: 14,
  },
  readMoreButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
  },
  readMoreText: {
    color: '#000',
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  card: {
    marginRight: 10,
    width: 120,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  cardText: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
});

export default location;
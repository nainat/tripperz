import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const DiscussionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} />
        <Text style={styles.headerTitle}>DISCUSSION</Text>
        <Ionicons name="menu" size={24} />
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search or Create a Post" style={styles.searchInput} />
        <Ionicons name="camera-outline" size={22} />
        <MaterialIcons name="attach-file" size={22} />
      </View>

      {/* Sort & Tags */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn}>
          <FontAwesome name="sort" size={16} />
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="pricetags-outline" size={16} />
          <Text style={styles.filterText}>Tags</Text>
        </TouchableOpacity>
      </View>

      {/* Posts */}
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Ionicons name="person-circle" size={30} color="purple" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.username}>me</Text>
            <Text style={styles.postTitle}>Looking for travel partner</Text>
            <Text style={styles.postContent}>Need someone to accompany me to Goa</Text>
          </View>
          <Text style={styles.time}>9:20 am{'\n'}01/04/2025</Text>
        </View>
        <View style={styles.tags}>
          <Text style={styles.tag}>female</Text>
          <Text style={styles.tag}>22+ yrs</Text>
          <Text style={styles.tag}>hindi</Text>
        </View>
        <Text style={styles.replies}>💬 replies</Text>
      </View>

      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Ionicons name="person-circle" size={30} color="#3b3bd4" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.username}>Aditya</Text>
            <Text style={styles.postTitle}>Need a group to travel</Text>
            <Text style={styles.postContent}>I am travelling to London and would like 4 boys to join my trip.</Text>
          </View>
          <Text style={styles.time}>8:20 am{'\n'}01/04/2025</Text>
        </View>
        <View style={styles.tags}>
          <Text style={styles.tag}>male</Text>
          <Text style={styles.tag}>25+ yrs</Text>
          <Text style={styles.tag}>english</Text>
        </View>
        <Text style={styles.replies}>💬 replies</Text>
      </View>

      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Ionicons name="person-circle" size={30} color="green" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.username}>Lily</Text>
            <Text style={styles.postContent}>Had an amazing time in Goa!</Text>
          </View>
        </View>
        <Image source={{ uri: 'https://i.imgur.com/WC3z6Dc.jpg' }} style={styles.postImage} />
        <Text style={styles.replies}>💬 replies</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#fefcfb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  searchInput: { flex: 1, marginHorizontal: 8 },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f1ec',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  filterText: { marginLeft: 6 },
  post: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  username: { fontWeight: 'bold', fontSize: 14 },
  postTitle: { fontWeight: '600', fontSize: 13 },
  postContent: { fontSize: 13 },
  time: { fontSize: 10, color: 'gray', textAlign: 'right' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6, gap: 6 },
  tag: {
    backgroundColor: '#f3e7d9',
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
  },
  replies: { marginTop: 6, fontSize: 13, color: 'gray' },
  postImage: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
});

export default DiscussionScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { dummyUsers } from '../../data/users';
import { colors } from '../../styles/colors';

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Nearby', 'Online', 'New'];

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUserCard = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Profile', { user: item })}
    >
      <Image source={{ uri: item.photos[0] }} style={styles.userPhoto} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userAge}>{item.age} years old</Text>
        <Text style={styles.userBio} numberOfLines={2}>{item.bio}</Text>
        <View style={styles.interestsContainer}>
          {item.interests.slice(0, 2).map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUserCard}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    backgroundColor: colors.backgroundDark,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  filtersContainer: {
    paddingVertical: 12,
    paddingLeft: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.backgroundDark,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  userCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  userInfo: {
    padding: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userAge: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  userBio: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestTag: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  interestText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '500',
  },
});


import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { matches } from '../../data/messages';
import { colors } from '../../styles/colors';

export default function MatchesScreen({ navigation }) {
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={styles.matchItem}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Chat', { match: item })}
    >
      <Image source={{ uri: item.photo }} style={styles.matchPhoto} />
      <View style={styles.matchInfo}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchName}>{item.name}</Text>
          <Text style={styles.matchTime}>{formatTime(item.timestamp)}</Text>
        </View>
        <Text style={styles.matchMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderMatch}
        contentContainerStyle={styles.listContent}
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
  header: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContent: {
    padding: 16,
  },
  matchItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  matchPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  matchInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  matchName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  matchTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  matchMessage: {
    fontSize: 14,
    color: colors.textLight,
  },
});


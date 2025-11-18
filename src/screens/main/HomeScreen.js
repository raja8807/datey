import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SwipeCard from '../../components/SwipeCard';
import { dummyUsers } from '../../data/users';
import { colors } from '../../styles/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;

export default function HomeScreen() {
  const [users, setUsers] = useState([...dummyUsers]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, users.length - 1));
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, users.length - 1));
  };

  const handleLike = () => {
    if (currentIndex < users.length) {
      handleSwipeRight();
    }
  };

  const handlePass = () => {
    if (currentIndex < users.length) {
      handleSwipeLeft();
    }
  };

  const currentUser = users[currentIndex];
  const nextUser = users[currentIndex + 1];

  if (!currentUser) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more profiles</Text>
        <Text style={styles.emptySubtext}>Check back later for more matches!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {nextUser && (
          <View style={[styles.cardWrapper, styles.nextCard]}>
            <SwipeCard
              user={nextUser}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          </View>
        )}
        <View style={styles.cardWrapper}>
          <SwipeCard
            user={currentUser}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={handlePass}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    paddingTop: 60,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.7,
    zIndex: 0,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 40,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  passButton: {
    backgroundColor: colors.white,
  },
  likeButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  emptySubtext: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});


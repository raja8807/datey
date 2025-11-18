import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, Animated, PanResponder } from 'react-native';
import { colors } from '../styles/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;

export default function SwipeCard({ user, onSwipeLeft, onSwipeRight }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const swipeThreshold = 120;
        
        if (gestureState.dx > swipeThreshold) {
          // Swipe right (like)
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            onSwipeRight();
            pan.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -swipeThreshold) {
          // Swipe left (pass)
          Animated.spring(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            onSwipeLeft();
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          // Return to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const opacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate },
          ],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <FlatList
        data={user.photos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
          setCurrentPhotoIndex(index);
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.photo} />
        )}
      />
      
      <View style={styles.photoIndicator}>
        {user.photos.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              index === currentPhotoIndex && styles.indicatorDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.nameAgeContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.age}>{user.age}</Text>
        </View>
        <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
        <View style={styles.interestsContainer}>
          {user.interests.slice(0, 3).map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: colors.white,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  photo: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 0.75,
    resizeMode: 'cover',
  },
  photoIndicator: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    opacity: 0.5,
  },
  indicatorDotActive: {
    opacity: 1,
    width: 24,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  nameAgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 12,
  },
  age: {
    fontSize: 24,
    color: colors.white,
    opacity: 0.9,
  },
  bio: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  interestText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
  },
});


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../styles/colors';

export default function UploadPhotosScreen({ navigation }) {
  const [photos, setPhotos] = useState(Array(6).fill(null));

  const pickImage = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const handleNext = () => {
    const photoCount = photos.filter(p => p !== null).length;
    if (photoCount >= 1) {
      navigation.navigate('Preferences');
    } else {
      Alert.alert('Add Photos', 'Please add at least one photo');
    }
  };

  const renderPhotoSlot = (index) => {
    const photo = photos[index];
    return (
      <TouchableOpacity
        key={index}
        style={styles.photoSlot}
        onPress={() => pickImage(index)}
        activeOpacity={0.8}
      >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>+</Text>
            <Text style={styles.photoPlaceholderSubtext}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Your Photos</Text>
          <Text style={styles.subtitle}>Add at least one photo to get started</Text>

          <View style={styles.photoGrid}>
            {photos.map((_, index) => renderPhotoSlot(index))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  photoSlot: {
    width: '48%',
    aspectRatio: 0.75,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.backgroundDark,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  photoPlaceholderText: {
    fontSize: 48,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  photoPlaceholderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});


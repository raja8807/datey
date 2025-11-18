import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../../styles/colors";
import { useAuth } from "../../context/AuthContext";

export default function BasicInfoScreen({ navigation }) {
  const { updateProfile } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  const handleNext = () => {
    if (name && age && selectedGender) {
      handleUpdateProfile();
      navigation.navigate("UploadPhotos");
    }
  };

  const handleUpdateProfile = () => {
    updateProfile({
      name,
      age,
      gender: selectedGender,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>Help us find your perfect match</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor={colors.textSecondary}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              {genders.map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    selectedGender === gender && styles.genderButtonSelected,
                  ]}
                  onPress={() => setSelectedGender(gender)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.genderText,
                      selectedGender === gender && styles.genderTextSelected,
                    ]}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!name || !age || !selectedGender) && styles.buttonDisabled,
            ]}
            onPress={handleNext}
            disabled={!name || !age || !selectedGender}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  genderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 12,
    marginBottom: 12,
  },
  genderButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  genderText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
  },
  genderTextSelected: {
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});

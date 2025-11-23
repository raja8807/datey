import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors } from "../../styles/colors";
import { useFetchInterests } from "../../api_hooks/interest_hooks/interest.hooks";
import { useAuth } from "../../context/AuthContext";
import { GENDERS } from "../../constants/constants";

export default function PreferencesScreen({ navigation }) {
  const [ageRange, setAgeRange] = useState([18, 23]);

  const [distance, setDistance] = useState(25);

  const [selectedInterests, setSelectedInterests] = useState([]);

  const { data: interests, isLoading } = useFetchInterests();

  const { session, updateProfile } = useAuth();

  const getInitialInterestedGender = () => {
    switch (session.user.gender) {
      case "Male":
        return "Female";
      case "Female":
        return "Male";
      case "Other":
        return "Other";
    }

    return "Any";
  };

  const [interestedGender, setInterestedGender] = useState(
    getInitialInterestedGender()
  );

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((i) => i.id !== interest.id)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = async () => {
    await updateProfile({
      ...session.user,
      interests: selectedInterests,
      preferences: {
        age_range_start: ageRange[0],
        age_range_end: ageRange[1],
        max_distance: distance,
        interested_gender: interestedGender,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Set Your Preferences</Text>
          <Text style={styles.subtitle}>
            Help us find better matches for you
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age Range</Text>
            <View style={styles.rangeContainer}>
              <View style={styles.rangeButtons}>
                <TouchableOpacity
                  style={styles.rangeButton}
                  onPress={() =>
                    setAgeRange((prev) => {
                      const newAgeRange = [...prev];
                      if (newAgeRange[0] > 18) {
                        newAgeRange[0] = newAgeRange[0] - 1;
                        newAgeRange[1] = newAgeRange[0] + 5;
                      }
                      return newAgeRange;
                    })
                  }
                >
                  <Text style={styles.rangeButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.rangeValue}>
                  <Text style={styles.rangeText}>{ageRange[0]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.rangeButton}
                  onPress={() =>
                    setAgeRange((prev) => {
                      const newAgeRange = [...prev];
                      newAgeRange[0] = newAgeRange[0] + 1;
                      newAgeRange[1] = newAgeRange[0] + 5;
                      return newAgeRange;
                    })
                  }
                >
                  <Text style={styles.rangeButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rangeButtons}>
                <TouchableOpacity
                  style={styles.rangeButton}
                  onPress={() =>
                    setAgeRange((prev) => {
                      const newAgeRange = [...prev];
                      if (newAgeRange[1] > newAgeRange[0] + 2) {
                        newAgeRange[1] = newAgeRange[1] - 1;
                      }
                      return newAgeRange;
                    })
                  }
                >
                  <Text style={styles.rangeButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.rangeValue}>
                  <Text style={styles.rangeText}>{ageRange[1]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.rangeButton}
                  onPress={() =>
                    setAgeRange((prev) => {
                      const newAgeRange = [...prev];

                      newAgeRange[1] = newAgeRange[1] + 1;

                      return newAgeRange;
                    })
                  }
                >
                  <Text style={styles.rangeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maximum Distance</Text>

            <View style={styles.rangeButtons}>
              <TouchableOpacity
                style={styles.rangeButton}
                onPress={() => setDistance(Math.max(5, distance - 5))}
              >
                <Text style={styles.rangeButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.distanceContainer}>
                <Text style={styles.distanceValue}>{distance} km</Text>
              </View>
              <TouchableOpacity
                style={styles.rangeButton}
                onPress={() => setDistance(Math.min(100, distance + 5))}
              >
                <Text style={styles.rangeButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View
                  style={[
                    styles.sliderFill,
                    { width: `${(distance / 100) * 100}%` },
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.sectionSubtitle}>Select your interests</Text>
            <View style={styles.interestsContainer}>
              {interests &&
                interests.map((interest) => (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestPill,
                      selectedInterests.includes(interest) &&
                        styles.interestPillSelected,
                    ]}
                    onPress={() => toggleInterest(interest)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.interestText,
                        selectedInterests.includes(interest) &&
                          styles.interestTextSelected,
                      ]}
                    >
                      {interest?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Looking For</Text>
            {/* <Text style={styles.sectionSubtitle}>Select your interests</Text> */}
            <View style={styles.interestsContainer}>
              {[...GENDERS, "Any"].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.interestPill,
                    interestedGender == gender && styles.interestPillSelected,
                  ]}
                  onPress={() => setInterestedGender(gender)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.interestText,
                      interestedGender == gender && styles.interestTextSelected,
                    ]}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Complete Setup</Text>
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
    paddingBottom: 40,
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  rangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  rangeValue: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    minWidth: 60,
    alignItems: "center",
  },
  rangeText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  rangeSeparator: {
    fontSize: 24,
    color: colors.text,
    marginHorizontal: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  rangeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  rangeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
  },
  rangeButtonText: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "600",
  },
  distanceContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  distanceValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },
  interestPill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
  },
  interestPillSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  interestText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  interestTextSelected: {
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});

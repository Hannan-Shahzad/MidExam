


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surah } from '../types';

const SURAH_STORAGE_KEY = 'stored_surahs';
const QURAN_API_URL = 'https://api.alquran.cloud/v1/quran/en.asad';

const SurahListScreen: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahDetails, setSurahDetails] = useState<any>(null);

  const fetchSurahsFromAPI = async () => {
    try {
      const response = await axios.get('https://api.alquran.cloud/v1/surah');
      
      if (response.status === 200) {
        const surahData = response.data.data;
        setSurahs(surahData);
        await AsyncStorage.setItem(SURAH_STORAGE_KEY, JSON.stringify(surahData));
      } else {
        throw new Error(`Server returned status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching surahs from API:', error);
      Alert.alert("Error", "Failed to fetch surahs from server. Showing offline data if available.");
      await loadStoredSurahs();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredSurahs = async () => {
    try {
      const storedSurahs = await AsyncStorage.getItem(SURAH_STORAGE_KEY);
      if (storedSurahs) {
        setSurahs(JSON.parse(storedSurahs));
      }
    } catch (error) {
      console.error('Error loading surahs from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSurahDetails = async (surahNumber: number) => {
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      if (response.status === 200) {
        setSurahDetails(response.data.data);
      } else {
        throw new Error("Failed to fetch surah details.");
      }
    } catch (error) {
      console.error("Error fetching surah details:", error);
      Alert.alert("Error", "Could not fetch surah details. Please try again later.");
    }
  };

  const handleSurahPress = (surahNumber: number) => {
    if (surahNumber === selectedSurah) {
      setSelectedSurah(null);
      setSurahDetails(null);
    } else {
      setSelectedSurah(surahNumber);
      fetchSurahDetails(surahNumber);
    }
  };

  useEffect(() => {
    fetchSurahsFromAPI();
  }, []);

  const renderSurahDetails = () => {
    if (selectedSurah && surahDetails) {
      return (
        <View style={styles.surahDetailsContainer}>
          {surahDetails.ayahs.map((ayah: any, index: number) => (
            <Text key={index} style={styles.ayahText}>
              {ayah.numberInSurah}. {ayah.text}
            </Text>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderItem = ({ item }: { item: Surah }) => (
    <View>
      <TouchableOpacity
        style={[styles.surahContainer, selectedSurah === item.number && styles.selectedSurahContainer]}
        onPress={() => handleSurahPress(item.number)}
      >
        <Text style={styles.surahName}>
          {item.number}. {item.englishName} ({item.englishNameTranslation})
        </Text>
      </TouchableOpacity>
      {selectedSurah === item.number && renderSurahDetails()}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>Quran-e-Kareem</Text>
        <Image
          style={styles.bannerImage}
          source={{ uri: 'data:image/jpeg;base64,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' }} // Keep your base64 string here
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  bannerContainer: { alignItems: 'center', marginBottom: 20 },
  bannerText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  bannerImage: { width: '100%', height: 300, borderRadius: 10, marginBottom: 10 },
  flatListContent: { paddingBottom: 20 },
  surahContainer: { 
    padding: 15, 
    borderRadius: 8, 
    backgroundColor: '#ffffff', 
    marginBottom: 10, 
    elevation: 2, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedSurahContainer: {
    backgroundColor: '#dceafc', // Light blue for selected surah
  },
  surahName: { fontSize: 18, color: '#333' },
  surahDetailsContainer: { padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8, marginTop: 10 },
  ayahText: { fontSize: 16, color: '#555' },
});

export default SurahListScreen;

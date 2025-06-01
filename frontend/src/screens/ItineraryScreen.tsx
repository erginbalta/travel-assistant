import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

interface ItineraryItem {
  id: string;
  poiId: string;
  time: string;
  poiName: string;
}

const ItineraryScreen = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);

  useEffect(() => {
    if (user) {
      fetchItineraries();
    }
  }, [user]);

  const fetchItineraries = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/itineraries`, {
        params: {
          user_id: user?.id,
        },
      });
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      Alert.alert('Error', 'Failed to load itineraries');
    }
  };

  const renderItem = ({ item }: { item: ItineraryItem }) => (
    <View style={[styles.item, { backgroundColor: theme.background }]}>
      <Text style={[styles.time, { color: theme.text }]}>
        {new Date(item.time).toLocaleTimeString()}
      </Text>
      <Text style={[styles.name, { color: theme.text }]}>{item.poiName}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={itineraries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: theme.primary }]}
        onPress={() => {
          // Navigate to create itinerary screen
        }}
      >
        <Text style={styles.createButtonText}>Create New Itinerary</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  time: {
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ItineraryScreen; 
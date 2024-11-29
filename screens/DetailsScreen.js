import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '7d4233815ffd36e1ec931388701f1a54';

const DetailsScreen = ({ route }) => {
  const { id, type } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]); // Estado para almacenar el reparto
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [ratedList, setRatedList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDetails();
    fetchCast(); // Obtener el cast
    loadRatedMovies();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCast = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      setCast(data.cast.slice(0, 10)); // Mostrar solo los 10 primeros actores
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  const loadRatedMovies = async () => {
    try {
      const storedRatedList = await AsyncStorage.getItem('ratedMovies');
      if (storedRatedList) {
        const parsedRatedList = JSON.parse(storedRatedList);
        setRatedList(parsedRatedList);
        const existingRating = parsedRatedList.find((item) => item.id === id);
        if (existingRating) {
          setReview(existingRating.review);
          setRating(existingRating.rating);
          setIsEditing(true);
        }
      }
    } catch (error) {
      console.error('Error loading rated movies:', error);
    }
  };

  const saveRatedMovies = async (newRatedList) => {
    try {
      await AsyncStorage.setItem('ratedMovies', JSON.stringify(newRatedList));
    } catch (error) {
      console.error('Error saving rated movies:', error);
    }
  };

  const handleAddToRated = async () => {
    if (!rating || isNaN(rating) || rating < 1 || rating > 10) {
      Alert.alert('Error', 'Por favor, ingresa una calificación entre 1 y 10.');
      return;
    }
    if (!review) {
      Alert.alert('Error', 'Por favor, ingresa una reseña.');
      return;
    }

    let updatedRatedList;
    if (isEditing) {
      updatedRatedList = ratedList.map((item) =>
        item.id === id ? { ...item, review, rating } : item
      );
      setIsEditing(false);
      Alert.alert('Actualizada', 'Tu reseña y calificación han sido actualizadas.');
    } else {
      const newRating = { id, review, rating, title: details.title || details.name };
      updatedRatedList = [...ratedList, newRating];
      Alert.alert('Calificada', 'Tu reseña y calificación han sido guardadas.');
    }

    setRatedList(updatedRatedList);
    await saveRatedMovies(updatedRatedList);
    setReview('');
    setRating('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FEE715FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {details && (
        <View>
          <Text style={styles.title}>{details.title || details.name}</Text>
          <Text style={styles.synopsis}>{details.overview}</Text>
          <Text style={styles.sectionTitle}>Reparto:</Text>
          <ScrollView horizontal style={styles.castContainer}>
            {cast.map((actor) => (
              <View key={actor.id} style={styles.actorCard}>
                <Image
                  source={{
                    uri: actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : 'https://via.placeholder.com/100',
                  }}
                  style={styles.actorImage}
                />
                <Text style={styles.actorName}>{actor.name}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.sectionTitle}>Escribe tu reseña:</Text>
          <TextInput
            placeholder="Escribe tu reseña aquí"
            style={styles.input}
            value={review}
            onChangeText={setReview}
          />
          <TextInput
            placeholder="Calificación (1-10)"
            style={styles.input}
            value={rating}
            keyboardType="numeric"
            onChangeText={setRating}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddToRated}>
            <Text style={styles.buttonText}>
              {isEditing ? 'Actualizar Reseña' : 'Guardar Reseña'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Reseñas existentes:</Text>
          {ratedList.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>{item.title}</Text>
              <Text style={styles.reviewText}>{item.review}</Text>
              <Text style={styles.reviewRating}>Calificación: {item.rating}/10</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#1e1e2f', flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  synopsis: { fontSize: 16, color: '#fff', marginBottom: 20 },
  sectionTitle: { fontSize: 20, color: '#FEE715FF', marginVertical: 10 },
  castContainer: { flexDirection: 'row', marginBottom: 20 },
  actorCard: { alignItems: 'center', marginHorizontal: 10 },
  actorImage: { width: 100, height: 150, borderRadius: 5 },
  actorName: { color: '#fff', marginTop: 5, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#FEE715FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#1e1e2f' },
  reviewCard: {
    backgroundColor: '#2e2e40',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  reviewTitle: { color: '#fff', fontWeight: 'bold' },
  reviewText: { color: '#fff' },
  reviewRating: { color: '#FEE715FF', fontWeight: 'bold' },
});

export default DetailsScreen;

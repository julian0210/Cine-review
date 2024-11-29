import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación para manejar el estado de autenticación
import { FontAwesome } from '@expo/vector-icons'; // Importa el componente de iconos FontAwesome para el ícono de cierre de sesión

// Componente principal para la pantalla de perfil de usuario
const ProfileScreen = ({ navigation }) => {
  // Uso del contexto de autenticación para obtener el usuario, la función de logout y el estado de carga
  const { user, logout, isLoading } = useContext(AuthContext);

  // Estados locales para almacenar las películas y series obtenidas de la API
  const [ratedMovies, setRatedMovies] = useState([]); // Películas calificadas por el usuario
  const [watchlist, setWatchlist] = useState([]); // Lista de películas por ver
  const [loadingMovies, setLoadingMovies] = useState(true); // Estado para controlar la carga de las películas y series

  // useEffect que se ejecuta al cargar el componente para obtener las películas y series populares de la API
  useEffect(() => {
    // Función asíncrona para obtener las películas y series
    const fetchMovies = async () => {
      try {
        const apiKey = '7d4233815ffd36e1ec931388701f1a54'; // Clave API para acceder a TMDB (The Movie Database)

        // Obtención de las películas populares
        const ratedResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`);
        const ratedData = await ratedResponse.json();

        // Obtención de las series populares
        const watchlistResponse = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=1`);
        const watchlistData = await watchlistResponse.json();

        // Actualización del estado con las películas y series obtenidas
        setRatedMovies(ratedData.results.slice(0, 2)); // Tomamos las primeras dos películas
        setWatchlist(watchlistData.results.slice(0, 2)); // Tomamos las primeras dos series
      } catch (error) {
        console.error('Error fetching movies and TV shows:', error); // Manejo de errores
      } finally {
        setLoadingMovies(false); // Indicamos que la carga de películas y series ha finalizado
      }
    };

    // Llamada a la función para obtener las películas y series
    fetchMovies();
  }, []); // Dependencia vacía, el efecto solo se ejecuta una vez cuando el componente se monta

  // Si aún se está cargando el usuario o las películas/series, mostramos un indicador de carga
  if (isLoading || loadingMovies) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FEE715FF" /> {/* Indicador de carga de color amarillo */}
      </View>
    );
  }

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    await logout(); // Llamada a la función de cierre de sesión
    navigation.replace('Welcome'); // Redirige a la pantalla de bienvenida
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Cabecera del perfil */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: user?.profileImage || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', // Imagen de perfil del usuario o imagen por defecto
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user?.name || 'Bob'}</Text> {/* Nombre del usuario o nombre por defecto */}
        </View>

        {/* Sección de películas calificadas */}
        <Text style={styles.sectionTitle}>Películas y Series Calificadas</Text>
        <View style={styles.moviesContainer}>
          {ratedMovies.map((movie, index) => (
            <View key={index} style={styles.movieBox}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} // URL de la imagen de la película
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{movie.title || movie.name}</Text> {/* Título de la película */}
            </View>
          ))}
        </View>

        {/* Sección de lista de películas por ver */}
        <Text style={styles.sectionTitle}>Lista de Películas por Ver</Text>
        <View style={styles.moviesContainer}>
          {watchlist.map((movie, index) => (
            <View key={index} style={styles.movieBox}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} // URL de la imagen de la serie
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{movie.title || movie.name}</Text> {/* Título de la serie */}
            </View>
          ))}
        </View>
        
        {/* Botón de cierre de sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text> {/* Texto del botón */}
          <FontAwesome name="sign-out" size={20} color="#FEE715FF" /> {/* Ícono de cierre de sesión */}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Estilos utilizados en el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  movieBox: {
    width: '45%',
    margin: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 14,
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE715FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
});

export default ProfileScreen; // Exporta el componente ProfileScreen para que pueda ser utilizado en otras partes de la aplicación

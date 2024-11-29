import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

// Configuración de la API para obtener datos de películas
const API_KEY = '7d4233815ffd36e1ec931388701f1a54'; // Clave de la API para autenticación
const BASE_URL = 'https://api.themoviedb.org/3'; // URL base de la API para consultar datos

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]); // Estado local para almacenar las películas

  // useEffect para obtener las películas populares desde la API cuando el componente se monta
  useEffect(() => {
    // Función asincrónica para hacer la solicitud HTTP a la API
    const fetchMovies = async () => {
      try {
        // Hacemos la petición para obtener las películas populares
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json(); // Convertimos la respuesta en formato JSON
        setMovies(data.results || []); // Actualizamos el estado con los resultados
      } catch (error) {
        console.error('Error fetching movies:', error); // Manejo de errores
      }
    };

    fetchMovies(); // Llamamos a la función para obtener las películas
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <View style={styles.container}>
      {/* Encabezado de la aplicación */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🎬 CineReview</Text>
      </View>

      {/* Contenido desplazable (ScrollView) para mostrar las películas */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Películas Populares</Text> {/* Título de la sección */}
        <View style={styles.moviesContainer}>
          {movies.map((movie) => (
            // Iteramos sobre las películas obtenidas y mostramos cada una
            <TouchableOpacity
              key={movie.id} // Usamos el ID como clave única para cada elemento
              style={styles.movieCard}
              // Navegamos a la pantalla de detalles de la película al hacer clic
              onPress={() => navigation.navigate('Details', { id: movie.id, type: 'movie' })}
            >
              <Image
                source={{
                  uri: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Si hay una imagen, la mostramos
                    : 'https://placehold.co/150x225?text=No+Image', // Si no hay imagen, mostramos una imagen de marcador de posición
                }}
                style={styles.moviePoster} // Estilo para la imagen de la película
              />
              <Text style={styles.movieTitle} numberOfLines={1}>
                {movie.title} {/* Título de la película */}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegación fija en la parte inferior */}
      <View style={styles.navbar}>
        {/* Botón de inicio */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        {/* Botón de búsqueda */}
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.navIcon}>🔍</Text>
        </TouchableOpacity>
        {/* Botón de perfil */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para los diferentes componentes de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la altura y anchura disponible
    backgroundColor: '#1e1e2f', // Color de fondo de la pantalla
    height: '100vh',  // Asegura que el contenedor ocupe toda la altura de la ventana
  },
  header: {
    padding: 20,
    backgroundColor: '#252542', // Color de fondo del encabezado
    alignItems: 'center', // Centra el texto horizontalmente
  },
  headerText: {
    fontSize: 24, // Tamaño de la fuente del título
    fontWeight: 'bold', // Estilo de fuente en negrita
    color: '#fff', // Color del texto
  },
  scrollContent: {
    padding: 16, // Espaciado dentro del ScrollView
    overflow: 'auto',  // Permite que el contenido se desplace si es necesario
    flexGrow: 1,  // Hace que el ScrollView crezca según el contenido
  },
  sectionTitle: {
    fontSize: 20, // Tamaño de la fuente del título de la sección
    fontWeight: 'bold', // Negrita
    color: '#fff', // Color del texto
    marginBottom: 16, // Espaciado inferior
  },
  moviesContainer: {
    flexDirection: 'row', // Muestra las tarjetas de película en fila
    flexWrap: 'wrap', // Permite que las tarjetas se envuelvan cuando no hay espacio suficiente
    justifyContent: 'space-between', // Espacio entre las tarjetas
  },
  movieCard: {
    width: '30%', // Cada tarjeta ocupa el 30% del ancho del contenedor
    marginBottom: 16, // Espaciado inferior
    backgroundColor: '#252542', // Fondo oscuro para las tarjetas de película
    borderRadius: 10, // Bordes redondeados
    padding: 8, // Espaciado dentro de la tarjeta
  },
  moviePoster: {
    width: '100%', // La imagen ocupa todo el ancho disponible de la tarjeta
    height: 200, // Altura fija para la imagen
    borderRadius: 10, // Bordes redondeados para la imagen
  },
  movieTitle: {
    color: '#fff', // Color del título de la película
    fontSize: 14, // Tamaño de la fuente del título
    fontWeight: 'bold', // Negrita
    marginTop: 8, // Espaciado superior
  },
  navbar: {
    flexDirection: 'row', // Los botones de navegación estarán en fila
    justifyContent: 'space-around', // Espacio uniforme entre los botones
    padding: 10, // Espaciado dentro de la barra de navegación
    backgroundColor: '#252542', // Fondo oscuro para la barra de navegación
  },
  navIcon: {
    fontSize: 24, // Tamaño de los íconos de navegación
    color: '#fff', // Color de los íconos
  },
});

export default HomeScreen;

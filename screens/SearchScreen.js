// Importa las dependencias necesarias de React y React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Iconos de FontAwesome para los botones de la barra de navegación

// Constantes de configuración de la API de TMDB
const API_KEY = '7d4233815ffd36e1ec931388701f1a54'; // Reemplaza con tu propia API Key de TMDB
const BASE_URL = 'https://api.themoviedb.org/3'; // URL base de la API

// Componente SearchScreen para manejar la búsqueda de películas o series
const SearchScreen = ({ navigation }) => {
  // Estados para almacenar la consulta de búsqueda, los resultados de la búsqueda y el estado de carga
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hook de efecto para hacer la búsqueda cuando la consulta de búsqueda cambie
  useEffect(() => {
    // Solo hace la búsqueda si la longitud de la consulta es mayor o igual a 3 caracteres
    if (searchQuery.length >= 3) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Limpia los resultados si la consulta tiene menos de 3 caracteres
    }
  }, [searchQuery]); // Dependencia del hook: se ejecuta cuando cambia searchQuery

  // Función para obtener los resultados de la búsqueda desde la API de TMDB
  const fetchSearchResults = async () => {
    setLoading(true); // Inicia el indicador de carga
    try {
      // Realiza la solicitud a la API de TMDB usando la consulta de búsqueda
      const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchQuery}`);
      const data = await response.json(); // Convierte la respuesta en formato JSON
      setSearchResults(data.results || []); // Almacena los resultados o un arreglo vacío si no hay resultados
      setLoading(false); // Detiene el indicador de carga
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false); // Detiene el indicador de carga en caso de error
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con el título de la pantalla */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Buscar Películas o Series</Text>
      </View>

      {/* Campo de texto para introducir la consulta de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Busca tu contenido favorito..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery} // Actualiza el estado searchQuery cuando el texto cambia
      />

      {/* Muestra un indicador de carga mientras se esperan los resultados */}
      {loading && <ActivityIndicator size="large" color="#FEE715FF" style={styles.loadingIndicator} />}

      {/* Contenedor de resultados de búsqueda */}
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {/* Mapea los resultados y los muestra como tarjetas de contenido */}
        {searchResults.map((result) => (
          <TouchableOpacity
            key={result.id}
            style={styles.resultCard}
            onPress={() => navigation.navigate('Details', { id: result.id, type: result.media_type })} // Navega a la pantalla de detalles con el id del contenido
          >
            <Image
              source={{
                uri: result.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` // Muestra la imagen de la película o serie si existe
                  : 'https://via.placeholder.com/150', // Imagen por defecto si no hay imagen disponible
              }}
              style={styles.resultImage}
            />
            {/* Título de la película o serie */}
            <Text style={styles.resultTitle}>
              {result.title || result.name || 'Sin título'} {/* Muestra el título o nombre, o "Sin título" si no hay ninguno */}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Mensaje si no hay resultados y la consulta tiene al menos 3 caracteres */}
        {searchQuery.length >= 3 && searchResults.length === 0 && !loading && (
          <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
        )}
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.navbar}>
        {/* Botón de navegación a la pantalla de inicio */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Botón de búsqueda (actualmente no tiene acción asociada) */}
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="#FEE715FF" />
        </TouchableOpacity>
        {/* Botón de navegación al perfil del usuario */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c1e4e', // Fondo morado oscuro
  },
  header: {
    padding: 20,
    backgroundColor: '#3f2a75', // Un morado aún más oscuro para el encabezado
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEE715FF', // Amarillo brillante para el texto del encabezado
    textAlign: 'center', // Centra el texto
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    width: '90%',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#3f2a75', // Fondo de las tarjetas de los resultados
    borderRadius: 10,
  },
  resultImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  resultTitle: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  noResultsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3f2a75',
    padding: 10,
  },
});

export default SearchScreen;

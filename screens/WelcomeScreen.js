import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import backgroundImage from '../assets/fondoMovies.jpg';  // Importación de la imagen de fondo


// Componente funcional WelcomeScreen que recibe 'navigation' como propiedad para navegar entre pantallas
const WelcomeScreen = ({ navigation }) => {
  return (
    // Usamos ImageBackground para mostrar una imagen como fondo
    <ImageBackground 
      source={backgroundImage}  // Ruta de la imagen de fondo
      style={styles.background}  // Estilo para el fondo de la pantalla
    >
      {/* Capa de superposición con color de fondo semi-transparente */}
      <View style={styles.overlay}>
        {/* Título principal de la pantalla */}
        <Text style={styles.title}>Bienvenido a CineReview</Text>
        
        {/* Botón de "Iniciar Sesión" */}
        <TouchableOpacity 
          style={styles.button}  // Estilo para el botón
          onPress={() => navigation.navigate('Login')}  // Navega a la pantalla de Login al presionar
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>  {/* Texto del botón */}
        </TouchableOpacity>
        
        {/* Botón de "Registrarse" */}
        <TouchableOpacity 
          style={[styles.button, styles.registerButton]}  // Estilo para el botón, incluye variación de color
          onPress={() => navigation.navigate('Register')}  // Navega a la pantalla de Register al presionar
        >
          <Text style={styles.buttonText}>Registrarse</Text>  {/* Texto del botón */}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Estilos utilizados en el componente
const styles = StyleSheet.create({
  background: {
    flex: 1,  // Hace que el fondo ocupe toda la pantalla
    justifyContent: 'center',  // Centra los elementos en el eje vertical
    alignItems: 'center',  // Centra los elementos en el eje horizontal
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Capa con fondo oscuro y semi-transparente
    padding: 20,  // Espaciado interno
    borderRadius: 10,  // Bordes redondeados
    alignItems: 'center',  // Centra los elementos dentro de la capa
  },
  title: {
    fontSize: 32,  // Tamaño de la fuente del título
    color: 'white',  // Color del texto
    fontWeight: 'bold',  // Estilo de fuente en negrita
    marginBottom: 40,  // Espaciado debajo del título
    textAlign: 'center',  // Alineación del texto al centro
  },
  button: {
    backgroundColor: '#ff6347',  // Color de fondo para el botón (rojo tomate)
    paddingVertical: 15,  // Espaciado vertical dentro del botón
    paddingHorizontal: 30,  // Espaciado horizontal dentro del botón
    borderRadius: 25,  // Bordes redondeados en el botón
    marginVertical: 10,  // Espaciado entre botones
    width: '80%',  // Ancho del botón
    alignItems: 'center',  // Centra el texto dentro del botón
  },
  registerButton: {
    backgroundColor: '#1e90ff',  // Color de fondo para el botón de "Registrarse" (azul)
  },
  buttonText: {
    color: 'white',  // Color del texto del botón
    fontSize: 18,  // Tamaño de la fuente
    fontWeight: 'bold',  // Estilo de fuente en negrita
  },
});

// Exportamos el componente WelcomeScreen para su uso en otras partes de la aplicación
export default WelcomeScreen;

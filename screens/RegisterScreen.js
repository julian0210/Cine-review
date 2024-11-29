// Importa las dependencias necesarias de React y React Native
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { firebase } from '../firebaseConfig'; // Importa la configuración de Firebase
import Icon from 'react-native-vector-icons/FontAwesome'; // Iconos de FontAwesome para botones sociales
import backgroundImage from '../assets/fondoMovies.jpg'; // Importa la imagen de fondo

// Componente RegisterScreen para manejar el registro de nuevos usuarios
const RegisterScreen = ({ navigation }) => {
  // Estados para almacenar los valores del correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el registro de usuario
  const handleRegister = () => {
    // Llama al método de Firebase para crear un nuevo usuario con el correo y contraseña proporcionados
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Usuario registrado:", userCredential.user);
        // Después de registrar al usuario, redirige a la pantalla de inicio
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Resetea la pila de navegación y va a la pantalla "Home"
        });
      })
      .catch(error => {
        // Si ocurre un error, muestra un mensaje de alerta con el error
        alert(error.message);
      });
  };

  return (
    // Fondo de la pantalla con la imagen de fondo
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Título de la pantalla */}
        <Text style={styles.title}>Crear una cuenta</Text>
        
        {/* Campo de entrada para el correo electrónico */}
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address" // Establece el tipo de teclado para direcciones de correo electrónico
        />
        
        {/* Campo de entrada para la contraseña */}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry // Hace que el texto de la contraseña no sea visible
        />
        
        {/* Botón para registrar al usuario */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Contenedor para los botones de redes sociales */}
        <View style={styles.socialContainer}>
          {/* Botón de Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={30} color="#3b5998" />
          </TouchableOpacity>
          
          {/* Botón de Google */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={30} color="#db4a39" />
          </TouchableOpacity>
        </View>

        {/* Enlace para navegar a la pantalla de inicio de sesión */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Filtro oscuro para superponer sobre la imagen
    padding: 20,
    borderRadius: 10,
    width: '90%', // Establece el ancho al 90% de la pantalla
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center', // Centra el texto
  },
  input: {
    height: 50,
    borderColor: '#ccc', // Color del borde de los campos de texto
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo semi-transparente para los campos de texto
    color: 'white', // Color del texto en los campos de entrada
    width: '100%',
  },
  button: {
    backgroundColor: '#ff6347', // Color de fondo del botón
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center', // Centra el texto dentro del botón
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row', // Muestra los botones de redes sociales en fila
    justifyContent: 'center',
    marginVertical: 20, // Espacio entre los botones y el resto del contenido
  },
  socialButton: {
    marginHorizontal: 15, // Espaciado horizontal entre los botones
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegisterScreen;

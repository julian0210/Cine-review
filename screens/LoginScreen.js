// Importa las dependencias necesarias de React y React Native
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { firebase } from '../firebaseConfig'; // Importa la configuración de Firebase para manejar la autenticación
import backgroundImage from '../assets/fondoMovies.jpg'; // Importa la imagen de fondo para la pantalla

// Componente LoginScreen para manejar el inicio de sesión del usuario
const LoginScreen = ({ navigation }) => {
  // Estados para almacenar los valores del correo y la contraseña introducidos por el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión del usuario
  const handleLogin = () => {
    // Llama al método de Firebase para autenticar al usuario con el correo y la contraseña proporcionados
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Inicio de sesión exitoso:", userCredential.user);
        // Si el inicio de sesión es exitoso, redirige al usuario a la pantalla de inicio
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
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        {/* Campo de entrada para el correo electrónico */}
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail} // Actualiza el valor del correo cuando el usuario escribe
          style={styles.input}
          keyboardType="email-address" // Establece el tipo de teclado para direcciones de correo electrónico
        />
        
        {/* Campo de entrada para la contraseña */}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword} // Actualiza el valor de la contraseña cuando el usuario escribe
          style={styles.input}
          secureTextEntry // Hace que el texto de la contraseña no sea visible
        />
        
        {/* Botón para iniciar sesión */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Enlace para navegar a la pantalla de registro si el usuario no tiene cuenta */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  background: {
    flex: 1, // Hace que el fondo ocupe toda la pantalla
    justifyContent: 'center', // Centra los elementos verticalmente
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para hacer más legible el contenido
    padding: 20, // Espaciado interno
    borderRadius: 10, // Bordes redondeados
    width: '90%', // Ancho relativo al 90% del contenedor
    alignItems: 'center', // Centra los elementos dentro del contenedor
  },
  title: {
    fontSize: 32, // Tamaño de la fuente del título
    color: 'white', // Color blanco para el título
    fontWeight: 'bold', // Negrita en el título
    marginBottom: 40, // Espacio debajo del título
    textAlign: 'center', // Alineación centrada del título
  },
  input: {
    height: 50, // Altura de los campos de entrada
    borderColor: '#ccc', // Color del borde del campo de entrada
    borderWidth: 1, // Ancho del borde
    marginBottom: 20, // Espacio entre los campos
    paddingHorizontal: 15, // Relleno horizontal en el campo de entrada
    borderRadius: 25, // Bordes redondeados en los campos
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo semitransparente
    color: 'white', // Color del texto dentro del campo
    width: '100%', // Ancho completo del contenedor
  },
  button: {
    backgroundColor: '#ff6347', // Color de fondo del botón
    paddingVertical: 15, // Relleno vertical
    paddingHorizontal: 30, // Relleno horizontal
    borderRadius: 25, // Bordes redondeados en el botón
    marginVertical: 10, // Espacio vertical entre los botones
    width: '100%', // Ancho completo
    alignItems: 'center', // Centra el texto dentro del botón
  },
  buttonText: {
    color: 'white', // Color del texto dentro del botón
    fontSize: 18, // Tamaño del texto
    fontWeight: 'bold', // Negrita en el texto
  },
  registerText: {
    color: '#1e90ff', // Color azul para el enlace
    marginTop: 20, // Espacio encima del texto
    fontSize: 16, // Tamaño de fuente para el enlace
  },
});

export default LoginScreen;

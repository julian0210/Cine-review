// Importa los módulos necesarios de React y React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa las pantallas de la aplicación
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';

// Importa el contexto de autenticación
import { AuthProvider } from './context/AuthContext';

// Crea el objeto Stack que manejará la navegación entre pantallas
const Stack = createStackNavigator();

export default function App() {
  return (
    // Envuelve la aplicación con AuthProvider para proporcionar el contexto de autenticación a toda la aplicación
    <AuthProvider>
      {/* El NavigationContainer es el contenedor principal para la navegación de React Navigation */}
      <NavigationContainer>
        {/* Stack.Navigator maneja la navegación entre las pantallas mediante una pila */}
        <Stack.Navigator initialRouteName="Welcome">
          {/* Pantalla de bienvenida */}
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ title: 'Bienvenido a Cine Review' }} 
          />
          
          {/* Pantalla de inicio de sesión */}
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Iniciar Sesión' }} 
          />
          
          {/* Pantalla de registro para crear una nueva cuenta */}
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ title: 'Nueva Cuenta' }} 
          />
          
          {/* Pantalla principal después de iniciar sesión */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'CineReview' }} 
          />
          
          {/* Pantalla de búsqueda */}
          <Stack.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{ title: 'Cine Review' }} 
          />
          
          {/* Pantalla de perfil del usuario */}
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Perfil' }} 
          />
          
          {/* Pantalla de detalles de una película */}
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{ title: 'Detalles' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

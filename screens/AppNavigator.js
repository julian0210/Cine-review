// Importaciones de dependencias necesarias
import React, { useContext } from 'react'; // Se importa React y useContext para gestionar el contexto de autenticación.
import { createStackNavigator } from '@react-navigation/stack'; // Se importa la funcionalidad de navegación por stack (pilas) desde React Navigation.
import WelcomeScreen from '../screens/WelcomeScreen'; // Se importa la pantalla de bienvenida.
import HomeScreen from '../screens/HomeScreen'; // Se importa la pantalla principal del hogar.
import SearchScreen from '../screens/SearchScreen'; // Se importa la pantalla de búsqueda.
import DetailsScreen from '../screens/DetailsScreen'; // Se importa la pantalla de detalles.
import ProfileScreen from '../screens/ProfileScreen'; // Se importa la pantalla del perfil de usuario.
import { AuthContext } from '../context/AuthContext'; // Se importa el contexto de autenticación para acceder al estado del usuario.

const Stack = createStackNavigator(); // Se crea una instancia del stack navigator.

const AppNavigator = () => {
    // Utilizamos el hook useContext para acceder al estado de autenticación, como el usuario actual y el estado de carga (loading).
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Si el estado de "loading" es verdadero, se puede mostrar una pantalla de carga o spinner, pero por ahora no renderiza nada.
        return null;
    }

    // Se devuelve el stack navigator con las pantallas disponibles basadas en el estado de autenticación del usuario.
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                // Si hay un usuario autenticado, se muestran las pantallas principales.
                <>
                    <Stack.Screen name="Home" component={HomeScreen} /> {/* Pantalla principal del hogar */}
                    <Stack.Screen name="Search" component={SearchScreen} /> {/* Pantalla de búsqueda */}
                    <Stack.Screen name="Details" component={DetailsScreen} /> {/* Pantalla de detalles */}
                    <Stack.Screen name="Profile" component={ProfileScreen} /> {/* Pantalla del perfil del usuario */}
                </>
            ) : (
                // Si no hay un usuario autenticado, se muestra la pantalla de bienvenida.
                <Stack.Screen name="Welcome" component={WelcomeScreen} /> /* Pantalla del perfil de bienvenida */
            )}
        </Stack.Navigator>
    );
};

// Se exporta el componente AppNavigator para ser usado en otras partes de la aplicación.
export default AppNavigator;

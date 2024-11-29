// Importa las dependencias necesarias de React y AsyncStorage
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crea el contexto de autenticación
export const AuthContext = createContext();

// Crea el AuthProvider que proveerá el contexto de autenticación a los componentes hijos
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el usuario autenticado (si hay alguno)
    const [user, setUser] = useState(null);
    // Estado para manejar la carga inicial (determina si los datos del usuario están siendo cargados)
    const [loading, setLoading] = useState(true);

    // useEffect se ejecuta solo una vez después del montaje del componente
    useEffect(() => {
        // Función para cargar los datos del usuario almacenados de manera persistente (por ejemplo, en AsyncStorage)
        const loadUserData = async () => {
            try {
                // Intenta obtener los datos del usuario almacenados
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    // Si existen datos, se almacenan en el estado 'user' después de parsearlos
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                // Si ocurre un error, lo imprime en la consola
                console.error('Error loading user data', error);
            } finally {
                // Independientemente del resultado, se establece 'loading' como false
                setLoading(false); // Finaliza la carga inicial
            }
        };

        // Llama a la función para cargar los datos
        loadUserData();
    }, []); // El array vacío [] asegura que solo se ejecute una vez, cuando el componente se monta

    // Función para manejar el inicio de sesión
    const login = async (userData) => {
        try {
            // Guarda los datos del usuario en AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            // Actualiza el estado 'user' con los datos del usuario
            setUser(userData);
        } catch (error) {
            // Si ocurre un error, lo imprime en la consola
            console.error('Error saving user data', error);
        }
    };

    // Función para manejar el cierre de sesión
    const logout = async () => {
        try {
            // Elimina los datos del usuario de AsyncStorage
            await AsyncStorage.removeItem('user');
            // Limpia el estado 'user' estableciendo su valor como null
            setUser(null);
        } catch (error) {
            // Si ocurre un error, lo imprime en la consola
            console.error('Error removing user data', error);
        }
    };

    return (
        // Provee el contexto a los componentes hijos, pasando los valores que se deben compartir (usuario, funciones de login/logout, y estado de carga)
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children} {/* Los componentes hijos pueden acceder al contexto de autenticación */}
        </AuthContext.Provider>
    );
};

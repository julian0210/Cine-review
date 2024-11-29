// api.js

// Importa la librería axios para hacer peticiones HTTP
import axios from 'axios';

// Definición de la clave de API para autenticarse en el servicio de TMDB
const API_KEY = '7d4233815ffd36e1ec931388701f1a54';

// URL base de la API de The Movie Database (TMDB)
const BASE_URL = 'https://api.themoviedb.org/3';

// Creación de una instancia de axios con configuración predeterminada
const api = axios.create({
  baseURL: BASE_URL, // Establece la URL base para las peticiones
  params: {
    api_key: API_KEY,  // Añade la clave de API para autenticación en todas las peticiones
    language: 'es-ES', // Configura el idioma de las respuestas (en este caso, español)
  },
});

// Exporta la instancia de axios configurada para ser utilizada en otros archivos
export default api;

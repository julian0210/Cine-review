// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Importa la función para inicializar la aplicación Firebase
import firebase from 'firebase/compat/app'; // Importa el objeto principal de Firebase con compatibilidad (compat) para versiones anteriores
import 'firebase/compat/auth'; // Importa el módulo de autenticación de Firebase con compatibilidad
import 'firebase/compat/firestore'; // Importa el módulo de Firestore de Firebase con compatibilidad

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Configuration for your web app (Configuración de Firebase para la aplicación web)
const firebaseConfig = {
  apiKey: "AIzaSyCwXZV-BkP1ntB_469uS30OZAmcO8fpHfM", // Clave de API pública
  authDomain: "cinereview-4f636.firebaseapp.com", // Dominio de autenticación
  projectId: "cinereview-4f636", // ID del proyecto Firebase
  storageBucket: "cinereview-4f636.firebasestorage.app", // Almacenamiento de archivos de Firebase
  messagingSenderId: "55306942394", // ID del remitente de mensajes para Firebase Cloud Messaging (FCM)
  appId: "1:55306942394:web:23e63ae29d5f8c2e73cf83" // ID de la aplicación de Firebase
};

// Verifica si la aplicación de Firebase ya está inicializada
if (!firebase.apps.length) {
  // Si no está inicializada, inicializa la aplicación con la configuración proporcionada
  firebase.initializeApp(firebaseConfig);
} else {
  // Si ya está inicializada, usa la instancia existente de la aplicación Firebase
  firebase.app(); // Mantiene la instancia ya inicializada
}

// Inicializa Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Exporta la instancia de Firebase para usarla en otras partes de la aplicación
export { firebase };

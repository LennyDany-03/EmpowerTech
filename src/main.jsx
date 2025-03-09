// src/main.jsx or src/index.jsx for React 18+
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App';
import './index.css';

// For React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

// Alternatively, if you're using this in App.jsx
// export default function AppWithProviders() {
//   return (
//     <LanguageProvider>
//       <App />
//     </LanguageProvider>
//   );
// }
import { createRoot } from "react-dom/client";
import React from 'react'
import { AuthProvider } from './context/AuthContext.tsx' // Novo import
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

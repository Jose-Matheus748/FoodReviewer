import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Usuario {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    // Tenta carregar o usuário do localStorage ao iniciar
    const storedUser = localStorage.getItem('apelido');
    // Nota: O apelido no DTO do Spring Boot é o 'username' da entidade Usuario.
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Sincroniza o estado do usuário com o localStorage
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  const login = (userData: Usuario) => {
    setUsuario(userData);
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

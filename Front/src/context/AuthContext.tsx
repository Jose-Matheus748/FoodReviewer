import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Usuario {
  id: number;
  apelido: string;
  email: string;
  role: "USER" | "ADMIN" | "MESTRE";
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    // ✅ Corrigido: usa a chave 'usuario' para manter consistência
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Atualiza o localStorage sempre que o estado mudar
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  const login = (userData: Usuario) => {
    setUsuario(userData);
    localStorage.setItem('usuario', JSON.stringify(userData)); // ✅ garante persistência imediata
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario'); // ✅ limpa corretamente
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
//ta marcado de amarelo por causa do eslint 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
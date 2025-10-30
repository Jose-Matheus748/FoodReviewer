import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // CORRIGIDO
import logo from "@/assets/logo-foodreviewer.png";

export const Header = () => {
  const { usuario, logout } = useAuth(); // Uso do hook de autenticação
  return (
    <header className="w-full border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="FoodReviewer Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            FoodReviewer
          </h1>
        </div>
        {/* Lógica de verificação de login no Header */}
        {usuario ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Ícone do Usuário (primeira letra do apelido) */}
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-lg shadow-md">
                {usuario.apelido.charAt(0).toUpperCase()}
              </div>
              <span className="text-primary font-medium hidden sm:inline">{usuario.apelido}</span>
            </div>
            {/* Botão de Logout */}
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-primary text-primary hover:bg-primary/10 font-medium shadow-md hover:shadow-lg transition-all"
            >
              {/* Você pode adicionar um ícone de logout aqui, se tiver um */}
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button 
              variant="default" 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 shadow-md hover:shadow-lg transition-all"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

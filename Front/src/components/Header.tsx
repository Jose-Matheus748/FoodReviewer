import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "@/assets/logo-foodreviewer.png";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AlertSuccess } from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/AlertError";

export const Header = () => {
  const { usuario, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alertError, setAlertError] = useState("");

  const [query, setQuery] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;


  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/api/produtos/search?nome=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Erro ao buscar produto");

      const produtos = await response.json();

      if (produtos.length > 0) {
        navigate(`/produto/${produtos[0].id}`);
      } else {
        setAlertError("Produto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setAlertError("Ocorreu um erro ao buscar o produto.");
    }
  };

  return (
    <header className="w-full border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <AlertSuccess open={!!alertSuccess} onClose={() => setAlertSuccess("")} message={alertSuccess} />
          <AlertError open={!!alertError} onClose={() => setAlertError("")} message={alertError} />
        {/*Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logo}
            alt="FoodReviewer Logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            FoodReviewer
          </h1>
        </Link>

        {/*SearchBar — só aparece fora da Home */}
        {!isHomePage && (
          <form
            onSubmit={handleSearch}
            className="relative flex items-center justify-center flex-1 max-w-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-primary rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-full blur-2xl opacity-50" />
            <div className="relative flex items-center bg-card/80 backdrop-blur-sm border-2 border-border rounded-full shadow-md hover:shadow-lg hover:border-accent/50 transition-all duration-300 w-full">
              <Search className="ml-5 h-5 w-5 text-muted-foreground flex-shrink-0" />
              <Input
                type="text"
                placeholder="Buscar produto..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 bg-transparent px-4 py-5 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground w-full"
              />
            </div>
          </form>
        )}

        {/*botao de Login ou botao de Logout */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {usuario?.role === "MESTRE" && (
          <Link to="/admin/cadastrar">
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/50 bg-background hover:bg-accent/10 transition-all shadow-sm">
              Criar Admin
            </Button>
          </Link>
        )}
          {usuario ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-lg shadow-md">
                  {usuario.apelido.charAt(0).toUpperCase()}
                </div>
                <span className="text-primary font-medium hidden sm:inline">
                  {usuario.apelido}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-primary text-primary hover:bg-primary/10 font-medium shadow-md hover:shadow-lg transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                size="lg"
                className="px-8 py-2 rounded-full font-bold bg-accent text-white shadow-lg hover:bg-accent/90 hover:scale-105 hover:shadow-accent/40 transition-all duration-200">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

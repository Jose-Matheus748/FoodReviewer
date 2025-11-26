import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AlertSuccess } from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/AlertError";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alertError, setAlertError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;


  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/produtos/search?nome=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Erro ao buscar produto");

      const produtos = await response.json();

      if (produtos.length > 0) {
        const primeiro = produtos[0];
        navigate(`/produto/${primeiro.id}`);
      } else {
        setAlertError("Produto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setAlertError("Ocorreu um erro ao buscar o produto.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-primary rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      <AlertSuccess
            open={!!alertSuccess}
            onClose={() => setAlertSuccess("")}
            message={alertSuccess}
          />

          <AlertError
            open={!!alertError}
            onClose={() => setAlertError("")}
            message={alertError}
          />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-full blur-2xl opacity-50" />
      <div className="relative flex items-center bg-card/80 backdrop-blur-sm border-2 border-border rounded-full shadow-lg hover:shadow-xl hover:border-accent/50 transition-all duration-300">
        <Search className="ml-6 h-5 w-5 text-muted-foreground flex-shrink-0" />
        <Input
          type="text"
          placeholder="Digite o nome do produto que você deseja buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 bg-transparent px-4 py-6 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
        />
      </div>
    </form>
  );
};

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Search } from "lucide-react";

interface Produto {
  id: number;
  nome: string;
  marca?: string;
  preco?: number;
}

export default function BuscarProdutos() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(false);

  const [searchParams] = useSearchParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const termoURL = searchParams.get("nome") || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!termoURL.trim()) return;

      setBusca(termoURL);
      setCarregando(true);

      try {
        const response = await fetch(`${API_URL}/api/produtos/buscar?nome=${encodeURIComponent(termoURL)}`);
        if (!response.ok) {
          console.error("Resposta não OK ao buscar produtos:", response.status);
          setResultados([]);
          return;
        }
        const data = await response.json();
        setResultados(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setResultados([]);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, [termoURL, API_URL]);


  return (
    <>
      <Header hideSearch />

      <div className="flex flex-col items-center w-full mt-16 px-4">

        {/* TÍTULO E SEARCH */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r 
            from-accent via-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
            Explorar Produtos
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Busque, compare e descubra novos alimentos
          </p>
        </div>

        {/* 🔍 SEARCHBAR MAIS PROFISSIONAL */}
        <div className="relative w-full max-w-2xl mb-10 group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-xl opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 rounded-full blur-2xl opacity-40" />

          <div className="relative flex items-center bg-background/70 backdrop-blur-xl border-2 border-border/50 rounded-full shadow-xl w-full px-5 py-4">
            <Search className="h-5 w-5 text-primary mr-3" />
            <Input
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && window.location.assign(`/buscar-produtos?nome=${busca}`)}
              className="border-0 shadow-none bg-transparent text-lg focus-visible:ring-0"
            />
          </div>
        </div>

        {/* GRID DE RESULTADOS */}
        <div
          className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-8 w-full max-w-7xl"
        >
          {carregando && (
            <p className="text-lg text-primary font-medium animate-pulse">
              Buscando produtos...
            </p>
          )}

          {resultados.map((produto) => (
            <Link to={`/produto/${produto.id}`} key={produto.id}>
              <div
                className="bg-card border border-border/40 rounded-2xl p-5 shadow-lg 
                hover:shadow-accent/40 hover:-translate-y-1 transition-all cursor-pointer w-60"
              >
                <img
                  src={`${API_URL}/api/produtos/${produto.id}/imagem`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                  className="w-full h-40 object-contain bg-white rounded-lg"
                />

                <div className="mt-4 text-center">
                  <p className="font-bold text-lg truncate text-primary">{produto.nome}</p>

                  {produto.marca && (
                    <p className="text-muted-foreground text-sm truncate">
                      {produto.marca}
                    </p>
                  )}

                  {produto.preco !== undefined && (
                    <p className="text-accent font-semibold mt-2 text-md">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!carregando && resultados.length === 0 && (
          <p className="mt-10 text-gray-600 dark:text-gray-300 text-lg">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  marca?: string;
  preco?: number;
}

export default function BuscarProdutos() {
  const navigate = useNavigate();
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
        const response = await fetch(
          `${API_URL}/api/produtos/search?nome=${encodeURIComponent(termoURL)}`
        );
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

      <div className="flex flex-col items-center w-full max-w-7xl mx-auto mt-16 px-6">
        {/* TÍTULO E SEARCH */}
        <div className="text-center mb-2">
          <h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r 
            from-accent via-primary to-accent bg-clip-text text-transparent drop-shadow-sm"
          >
            Explorar produtos
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Busque, compare e descubra novos alimentos
          </p>
        </div>

        {/* 🔍 SEARCHBAR MAIS PROFISSIONAL */}
        <div className="relative w-full max-w-2xl mb-5 group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-xl opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 rounded-full blur-2xl opacity-40" />

          <div className="relative flex items-center bg-background/70 backdrop-blur-xl border-2 border-border/50 rounded-full shadow-xl w-full px-5 py-1">
            <Search className="h-5 w-5 text-primary mr-3" />
            <Input
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  navigate(`/buscar-produtos?nome=${busca}`);
                }
              }}
              className="border-0 shadow-none bg-transparent text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background focus:outline-none transition"
            />
          </div>
        </div>

        {/* GRID DE RESULTADOS CENTRALIZADA */}
        <div className="flex justify-center w-full mb-10">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center justify-items-center"
          >
            {carregando && (
              <div className="flex justify-center items-center w-full col-span-full">
                <svg
                  className="animate-spin h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            )}

            {!carregando && resultados.length === 0 && (
              <p className="mt-10 text-gray-600 dark:text-gray-300 text-lg col-span-full text-center">
                Nenhum produto encontrado.
              </p>
            )}

            {resultados.map((produto) => (
              <Link to={`/produto/${produto.id}`} key={produto.id}>
                <div
                  className="
                    bg-gray-50 dark:bg-gray-800 
                    border border-gray-200 dark:border-gray-700 
                    rounded-2xl p-5 
                    shadow-sm dark:shadow-md
                    hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-2 
                    transition-transform duration-300 cursor-pointer 
                    w-60
                  "
                >
                  <img
                    src={`${API_URL}/api/produtos/${produto.id}/imagem`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                    className="w-full h-40 object-contain bg-white/90 rounded-lg"
                    alt={`Imagem do produto ${produto.nome}`}
                  />

                  <div className="mt-3 text-center">
                    <p className="font-bold text-lg text-primary line-clamp-2">
                      {produto.nome}
                    </p>

                    {produto.marca && (
                      <p className="text-muted-foreground text-sm line-clamp-1">
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
        </div>
      </div>
    </>
  );
}

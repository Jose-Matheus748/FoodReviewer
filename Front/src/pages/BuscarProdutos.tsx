import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  const API_URL = import.meta.env.VITE_API_URL;

  const buscarProdutos = async () => {
    if (!busca.trim()) return;

    try {
      setCarregando(true);

      const response = await fetch(
        `${API_URL}/api/produtos/search?nome=${encodeURIComponent(busca)}`
      );

      if (!response.ok) {
        console.error("Erro ao buscar produtos");
        return;
      }

      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") buscarProdutos();
  };

  return (
    <div className="flex flex-col items-center w-full mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Buscar Produtos
      </h1>

      <div className="flex gap-3 w-full max-w-xl">
        <Input
          placeholder="Digite o nome do produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={buscarProdutos} disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {/* GRID DE RESULTADOS */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6 mt-10 w-full max-w-7xl"
      >
        {resultados.map((produto) => (
          <Link to={`/produto/${produto.id}`} key={produto.id}>
            <div
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
              rounded-xl p-4 shadow-md hover:shadow-accent/30 
              transition-all hover:-translate-y-1 cursor-pointer"
            >
              {/* IMAGEM DO PRODUTO */}
              <img
                src={`${API_URL}/api/produtos/${produto.id}/imagem`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                }}
                className="w-full h-40 object-contain bg-white rounded-lg"
              />

              <div className="mt-3 text-gray-900 dark:text-white">
                <p className="font-bold text-sm truncate">{produto.nome}</p>

                {produto.marca && (
                  <p className="text-gray-600 dark:text-gray-300 text-xs truncate">
                    {produto.marca}
                  </p>
                )}

                {produto.preco !== undefined && (
                  <p className="text-accent font-semibold mt-2 text-sm">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {resultados.length === 0 && !carregando && (
        <p className="mt-10 text-gray-600 dark:text-gray-300">
          Nenhum resultado encontrado.
        </p>
      )}
    </div>
  );
}

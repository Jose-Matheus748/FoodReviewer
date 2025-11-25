import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Package } from "lucide-react";

export default function BuscarProdutos() {
  const [nome, setNome] = useState("");
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const buscar = async () => {
    if (!nome.trim()) return;

    setErro("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/produtos/search?nome=${nome}`);

      if (!res.ok) {
        setErro("Erro ao buscar produtos.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResultados(data);
    } catch (e) {
      setErro("Falha ao conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 px-4">

      <h1 className="text-2xl font-bold text-white mb-6">
        Buscar Produtos
      </h1>

      <div className="w-full max-w-xl bg-white/10 p-6 rounded-xl shadow-lg space-y-4 border border-white/20">

        <Label className="text-white font-semibold">Nome do produto</Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-white/50 h-5 w-5" />
          <Input
            placeholder="Ex: Toddynho"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="pl-10 bg-white/15 text-white border-white/20"
          />
        </div>

        <Button 
          onClick={buscar}
          disabled={loading}
          className="w-full bg-accent text-primary font-bold"
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>

        {erro && <p className="text-red-400 text-sm">{erro}</p>}
      </div>

      {/* Resultados */}
      <div className="w-full max-w-2xl mt-10 space-y-4">
        {resultados.map((produto: any) => (
          <div 
            key={produto.id}
            className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center gap-4"
          >
            <Package className="text-accent w-6 h-6" />

            <div className="text-white">
              <p className="font-bold text-lg">{produto.nome}</p>
              {produto.marca && (
                <p className="text-white/70 text-sm">{produto.marca}</p>
              )}
              {produto.preco && (
                <p className="text-white/80 mt-1">R$ {produto.preco}</p>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

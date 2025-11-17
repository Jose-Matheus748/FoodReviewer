import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logoFoodReviewer from "@/assets/logo-foodreviewer.png";

import {
  Package,
  Tag,
  FileText,
  Weight,
  FlaskConical,
  List,
  Image as ImageIcon,
  DollarSign,
} from "lucide-react";

export default function CadastroProduto() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [pesoGramas, setPesoGramas] = useState("");
  const [densidade, setDensidade] = useState("");

  const [ingredientes, setIngredientes] = useState<string[]>([""]);
  const [imagem, setImagem] = useState<File | null>(null);

  const adicionarIngrediente = () =>
    setIngredientes((prev) => [...prev, ""]);

  const atualizarIngrediente = (i: number, valor: string) => {
    const novo = [...ingredientes];
    novo[i] = valor;
    setIngredientes(novo);
  };

  // bloqueio de admin
  if (!usuario || usuario.role !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600">Acesso negado</h1>
        <p className="text-gray-600 mt-2">
          Somente administradores podem acessar esta página.
        </p>
        <Button className="mt-6" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </div>
    );
  }

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // transforma ["a", "b"] em [{ nome: "a" }, ...]
    const ingredientesArray = ingredientes
      .filter((i) => i.trim() !== "")
      .map((nome) => ({ nome }));

    const formData = new FormData();
    formData.append("nome", nome);
    if (descricao) formData.append("descricao", descricao);
    if (marca) formData.append("marca", marca);

    formData.append("preco", preco.toString());

    if (tipo) formData.append("tipo", tipo);
    if (pesoGramas) formData.append("pesoGramas", pesoGramas.toString());
    if (densidade) formData.append("densidade", densidade.toString());

    if (ingredientesArray.length > 0) {
      formData.append("ingredientes", JSON.stringify(ingredientesArray));
    }

    // NÃO enviar tabelaNutricional por agora, o backend aceita vazio

    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const res = await fetch("http://localhost:8080/produtos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => null);
        console.error("Erro:", msg);
        alert("Erro ao cadastrar produto.");
        return;
      }

      alert("Produto cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Falha ao conectar ao servidor.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] via-[#eaeaea] to-[#d8d8d8] overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(89, 37, 179, 0.81) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="absolute bottom-0 right-0 w-[650px] h-[650px] translate-x-1/3 translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/25 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl border border-accent/30 p-6 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
          <Link to="/" className="hover:opacity-80 hover:scale-105 transition-all mb-4">
            <img src={logoFoodReviewer} alt="logo" className="w-16 h-16 drop-shadow-lg" />
          </Link>

          <h1 className="text-2xl font-bold text-white text-center mb-4 tracking-wide drop-shadow">
            Cadastro de Produto
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-3">

            <CampoIcone
              label="Nome"
              valor={nome}
              setValor={setNome}
              placeholder="Nome do produto"
              Icon={Package}
            />

            <CampoIcone
              label="Marca"
              valor={marca}
              setValor={setMarca}
              placeholder="Ex: Nestlé"
              Icon={Tag}
            />

            <CampoIcone
              label="Tipo"
              valor={tipo}
              setValor={setTipo}
              placeholder="Ex: Achocolatado"
              Icon={FileText}
            />

            <CampoIcone
              label="Preço"
              valor={preco}
              setValor={setPreco}
              placeholder="Ex: 9.90"
              Icon={DollarSign}
              type="number"
            />

            <CampoIcone
              label="Peso (g)"
              valor={pesoGramas}
              setValor={setPesoGramas}
              placeholder="Ex: 400"
              Icon={Weight}
              type="number"
            />

            <CampoIcone
              label="Densidade"
              valor={densidade}
              setValor={setDensidade}
              placeholder="Ex: 50%"
              Icon={FlaskConical}
            />

            {/* INGREDIENTES */}
            <div className="space-y-1">
              <Label className="text-white/90 font-semibold text-sm">Ingredientes</Label>

              {ingredientes.map((ing, i) => (
                <div key={i} className="relative mb-2">
                  <List className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
                  <Input
                    value={ing}
                    onChange={(e) => atualizarIngrediente(i, e.target.value)}
                    className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 
                      focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                    placeholder="Ingrediente"
                  />
                </div>
              ))}

              <Button
                type="button"
                onClick={adicionarIngrediente}
                className="w-full h-8 bg-accent/80 text-primary font-bold text-xs rounded-md hover:bg-accent transition-all"
              >
                + Adicionar ingrediente
              </Button>
            </div>

            {/* IMAGEM */}
            <div className="space-y-1">
              <Label className="text-white/90 font-semibold text-sm">Imagem</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files?.[0] || null)}
                  className="pl-9 bg-white/15 border border-accent/40 text-white 
                    file:text-white/80 file:bg-transparent file:border-0 file:mr-4 
                    focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-9 bg-accent text-primary font-bold text-sm rounded-md shadow-md 
                hover:scale-[1.03] hover:bg-accent/90 hover:shadow-accent/50 transition-all"
            >
              Cadastrar Produto
            </Button>

            <p className="text-center text-white/80 text-xs mt-1">
              Voltar para{" "}
              <Link to="/" className="text-accent font-semibold hover:underline hover:text-accent/80">
                Home
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}

// COMPONENTE REUTILIZÁVEL
function CampoIcone({ label, valor, setValor, placeholder, Icon, type = "text" }) {
  return (
    <div className="space-y-1">
      <Label className="text-white/90 font-semibold text-sm">{label}</Label>

      <div className="relative">
        <Icon className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
        <Input
          type={type}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="pl-9 bg-white/15 border border-accent/40 text-white 
            placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 
            h-9 rounded-md transition-all text-sm"
          placeholder={placeholder}
          required={label === "Nome" || label === "Preço"}
        />
      </div>
    </div>
  );
}

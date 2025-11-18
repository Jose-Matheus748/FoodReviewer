import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logoFoodReviewer from "@/assets/logo-foodreviewer.png";

import {Package, Tag, FileText, Weight, FlaskConical, List, Image as ImageIcon, DollarSign, Utensils, } from "lucide-react";

export default function CadastroProduto() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [pesoGramas, setPesoGramas] = useState("");
  const [ingredientes, setIngredientes] = useState<string[]>([""]);
  const [imagem, setImagem] = useState<File | null>(null);

  const [calorias, setCalorias] = useState("");
  const [proteinas, setProteinas] = useState("");
  const [carboidratos, setCarboidratos] = useState("");
  const [gordurasTotais, setGordurasTotais] = useState("");
  const [gordurasSaturadas, setGordurasSaturadas] = useState("");
  const [fibras, setFibras] = useState("");
  const [sodio, setSodio] = useState("");
  const [acucares, setAcucares] = useState("");

  const adicionarIngrediente = () => setIngredientes((prev) => [...prev, ""]);

  const atualizarIngrediente = (i: number, valor: string) => {
    const novo = [...ingredientes];
    novo[i] = valor;
    setIngredientes(novo);
  };

  // acesso restrito
  if (!usuario || usuario.role == "USER") {
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

    if (preco && Number.isNaN(Number(preco.replace(",", ".")))) {
      alert("Preço inválido.");
      return;
    }

    if (pesoGramas && Number.isNaN(Number(pesoGramas.replace(",", ".")))) {
      alert("Peso inválido.");
      return;
    }

    const ingredientesArray = ingredientes
      .filter((i) => i.trim() !== "")
      .map((nome) => ({ nome }));

    const tabelaNutricionalObj: Record<string, number> = {};
    const pushNumber = (key: string, value: string) => {
      if (value != null && value.toString().trim() !== "") {
        const n = Number(value.replace(",", "."));
        if (!Number.isNaN(n)) tabelaNutricionalObj[key] = n;
      }
    };

    pushNumber("calorias", calorias);
    pushNumber("proteinas", proteinas);
    pushNumber("carboidratos", carboidratos);
    pushNumber("gordurasTotais", gordurasTotais);
    pushNumber("gordurasSaturadas", gordurasSaturadas);
    pushNumber("fibras", fibras);
    pushNumber("sodio", sodio);
    pushNumber("acucares", acucares);

    const formData = new FormData();
    formData.append("nome", nome);

    if (descricao) formData.append("descricao", descricao);
    if (marca) formData.append("marca", marca);
    if (tipo) formData.append("tipo", tipo);
    if (pesoGramas) formData.append("pesoGramas", pesoGramas.toString());
    if (preco) formData.append("preco", preco.toString());
    if (ingredientesArray.length > 0)
      formData.append("ingredientes", JSON.stringify(ingredientesArray));
    if (Object.keys(tabelaNutricionalObj).length > 0)
      formData.append(
        "tabelaNutricional",
        JSON.stringify(tabelaNutricionalObj)
      );
    if (imagem) formData.append("imagem", imagem);

    try {
      const res = await fetch("http://localhost:8080/produtos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Erro ao cadastrar produto.");
        return;
      }

      alert("Produto cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao servidor.");
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

      <div className="relative z-10 w-full max-w-3xl bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl border border-accent/30 p-8 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
          <Link
            to="/"
            className="hover:opacity-80 hover:scale-105 transition-all mb-4"
          >
            <img
              src={logoFoodReviewer}
              alt="logo"
              className="w-16 h-16 drop-shadow-lg"
            />
          </Link>

          <h1 className="text-2xl font-bold text-white text-center mb-6 tracking-wide drop-shadow">
            Cadastro de Produto
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-6">

            {/* Linha 1: Nome / Marca / Tipo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CampoIcone label="Nome" valor={nome} setValor={setNome} placeholder="Nome" Icon={Package} />
              <CampoIcone label="Marca" valor={marca} setValor={setMarca} placeholder="Ex: Nestlé" Icon={Tag} />
              <CampoIcone label="Tipo" valor={tipo} setValor={setTipo} placeholder="Ex: Achocolatado" Icon={FileText} />
            </div>

            {/* Linha 2: Preço / Peso / Densidade */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CampoIcone label="Preço" valor={preco} setValor={setPreco} placeholder="9.90" type="number" Icon={DollarSign} />
              <CampoIcone label="Peso (g)" valor={pesoGramas} setValor={setPesoGramas} placeholder="400" type="number" Icon={Weight} />
            </div>

            {/* DESCRIÇÃO */}
            <div className="space-y-1">
              <Label className="text-white/90 font-semibold text-sm">
                Descrição
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-accent/70 w-4 h-4" />
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição detalhada do produto"
                  className="pl-9 pr-3 pt-2 pb-2 w-full bg-white/15 border border-accent/40 text-white 
                    placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 
                    rounded-md transition-all text-sm resize-none h-24"
                />
              </div>
            </div>

            {/* TABELA NUTRICIONAL - 3 colunas */}
            <div className="space-y-3 bg-white/5 p-4 rounded-md border border-accent/20">
              <h3 className="text-white/90 font-semibold text-sm">
                Tabela Nutricional (por porção)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <CampoIcone label="Calorias" valor={calorias} setValor={setCalorias} placeholder="kcal" type="number" Icon={Utensils} />
                <CampoIcone label="Proteínas (g)" valor={proteinas} setValor={setProteinas} placeholder="g" type="number" Icon={Utensils} />
                <CampoIcone label="Carboidratos (g)" valor={carboidratos} setValor={setCarboidratos} placeholder="g" type="number" Icon={Utensils} />
                <CampoIcone label="Gorduras Totais" valor={gordurasTotais} setValor={setGordurasTotais} placeholder="g" type="number" Icon={Utensils} />
                <CampoIcone label="Gorduras Saturadas" valor={gordurasSaturadas} setValor={setGordurasSaturadas} placeholder="g" type="number" Icon={Utensils} />
                <CampoIcone label="Fibras (g)" valor={fibras} setValor={setFibras} placeholder="g" type="number" Icon={Utensils} />
                <CampoIcone label="Açúcares (g)" valor={acucares} setValor={setAcucares} placeholder="g" type="number" Icon={Utensils} />
                <CampoIcone label="Sódio (mg)" valor={sodio} setValor={setSodio} placeholder="mg" type="number" Icon={Utensils} />
              </div>
            </div>

            {/* INGREDIENTES - 2 colunas */}
            <div className="space-y-2">
              <Label className="text-white/90 font-semibold text-sm">Ingredientes</Label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredientes.map((ing, i) => (
                  <div key={i} className="relative">
                    <List className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
                    <Input
                      value={ing}
                      onChange={(e) => atualizarIngrediente(i, e.target.value)}
                      placeholder="Ingrediente"
                      className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 
                        focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                    />
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={adicionarIngrediente}
                className="w-full h-9 bg-accent/80 text-primary font-bold text-xs rounded-md hover:bg-accent transition-all"
              >
                + Adicionar ingrediente
              </Button>
            </div>

            {/* IMAGEM */}
            <div className="space-y-2">
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

            {/* BOTÃO */}
            <Button
              type="submit"
              className="w-full h-10 bg-accent text-primary font-bold text-sm rounded-md shadow-md 
                hover:scale-[1.03] hover:bg-accent/90 hover:shadow-accent/50 transition-all"
            >
              Cadastrar Produto
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


/* COMPONENTE REUTILIZÁVEL */
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

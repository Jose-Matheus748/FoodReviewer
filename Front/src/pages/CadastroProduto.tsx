import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // para restringir somente admin
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CadastroProduto = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");

  const [ingredientes, setIngredientes] = useState<string[]>([""]);
  const [alergenicos, setAlergenicos] = useState<string[]>([""]);

  const [imagem, setImagem] = useState<File | null>(null);

  const adicionarIngrediente = () => setIngredientes([...ingredientes, ""]);
  const adicionarAlergenico = () => setAlergenicos([...alergenicos, ""]);

  const atualizarIngrediente = (i: number, valor: string) => {
    const novo = [...ingredientes];
    novo[i] = valor;
    setIngredientes(novo);
  };

  const atualizarAlergenico = (i: number, valor: string) => {
    const novo = [...alergenicos];
    novo[i] = valor;
    setAlergenicos(novo);
  };

  // Se não for admin → bloqueia o acesso
  if (!usuario || usuario.role !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600">Acesso negado</h1>
        <p className="text-gray-600 mt-2">Somente administradores podem acessar esta página.</p>
        <Button className="mt-6" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </div>
    );
  }

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("marca", marca);
    formData.append("categoriaId", categoriaId);
    formData.append("fornecedorId", fornecedorId);

    formData.append("ingredientes", JSON.stringify(ingredientes));
    formData.append("alergenicos", JSON.stringify(alergenicos));

    if (imagem) formData.append("imagem", imagem);

    try {
      const response = await fetch("http://localhost:8080/produtos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Erro ao cadastrar produto");
        return;
      }

      alert("Produto cadastrado com sucesso!");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-3xl mx-auto mt-20 bg-white p-10 rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-[#8b009a]">Cadastro de Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Nome */}
        <div>
          <Label>Nome do Produto</Label>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        {/* Descrição */}
        <div>
          <Label>Descrição</Label>
          <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>

        {/* Marca */}
        <div>
          <Label>Marca</Label>
          <Input value={marca} onChange={(e) => setMarca(e.target.value)} required />
        </div>

        {/* Categoria */}
        <div>
          <Label>ID da Categoria</Label>
          <Input value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required />
        </div>

        {/* Fornecedor */}
        <div>
          <Label>ID do Fornecedor</Label>
          <Input value={fornecedorId} onChange={(e) => setFornecedorId(e.target.value)} required />
        </div>

        {/* Ingredientes */}
        <div>
          <Label>Ingredientes</Label>
          {ingredientes.map((ing, i) => (
            <Input
              key={i}
              className="mt-2"
              value={ing}
              onChange={(e) => atualizarIngrediente(i, e.target.value)}
              required
            />
          ))}
          <Button type="button" className="mt-2" onClick={adicionarIngrediente}>
            + Adicionar ingrediente
          </Button>
        </div>

        {/* Alergênicos */}
        <div>
          <Label>Alergênicos</Label>
          {alergenicos.map((a, i) => (
            <Input
              key={i}
              className="mt-2"
              value={a}
              onChange={(e) => atualizarAlergenico(i, e.target.value)}
            />
          ))}
          <Button type="button" className="mt-2" onClick={adicionarAlergenico}>
            + Adicionar alérgeno
          </Button>
        </div>

        {/* Upload da imagem */}
        <div>
          <Label>Imagem do Produto</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
          />
        </div>

        <Button type="submit" className="w-full py-3 text-lg">
          Cadastrar Produto
        </Button>
      </form>
    </motion.div>
  );
};

export default CadastroProduto;

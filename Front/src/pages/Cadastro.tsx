import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import logoFoodReviewer from "@/assets/logo-foodreviewer.png";

export default function Cadastro() {
  const [username, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          senha: senha,
        }),
      });

      if (response.ok) {
        console.log("Cadastro realizado com sucesso!");
        alert("Cadastro realizado com sucesso!");
        navigate("/login"); // redireciona após sucesso
      } else {
        const errorData = await response.json();
        console.error("Falha no cadastro:", errorData.message || response.statusText);
        alert("Erro ao cadastrar: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      console.error("Erro de rede/conexão:", error);
      alert("Erro de rede. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl p-8 border border-primary/20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img
                src={logoFoodReviewer}
                alt="FoodReviewer Logo"
                className="w-24 h-24 object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Cadastro
          </h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-accent font-semibold text-base">
                Nome
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setNome(e.target.value)}
                className="bg-primary/40 border-primary/30 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent h-12"
                placeholder="Digite seu username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-accent font-semibold text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary/40 border-primary/30 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent h-12"
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-accent font-semibold text-base">
                Senha
              </Label>
              <Input
                id="senha"
                type="senha"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-primary/40 border-primary/30 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent h-12"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-accent font-semibold text-base">
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-primary/40 border-primary/30 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent h-12"
                placeholder="Confirme sua senha"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-primary font-bold h-12 text-base rounded-lg transition-all"
            >
              Cadastrar
            </Button>

            <div className="text-center mt-6">
              <p className="text-white/80 text-sm">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-accent font-semibold hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

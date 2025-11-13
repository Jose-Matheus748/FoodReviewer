import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import logoFoodReviewer from "@/assets/logo-foodreviewer.png";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock } from "lucide-react";

export default function Cadastro() {
  const [apelido, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apelido, email, senha }),
      });

      if (response.ok) {
        const userData = await response.json();
        login({
          id: userData.id,
          apelido: userData.apelido,
          email: userData.email,
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Erro ao cadastrar: " + (errorData.message || response.statusText));
      }
    } catch {
      alert("Erro de rede. Verifique sua conexão e tente novamente.");
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8E8E8] to-[#d4d4d4] flex items-center justify-center py-6">
      <div className="w-full max-w-sm bg-gradient-to-b from-primary/95 to-primary rounded-3xl shadow-2xl border border-accent/20 p-5 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity mb-3">
          <img
            src={logoFoodReviewer}
            alt="FoodReviewer Logo"
            className="w-16 h-16 object-contain drop-shadow-lg"
          />
        </Link>

        {/* Título */}
        <h1 className="text-2xl font-bold text-white text-center mb-4 tracking-wide">
          Crie sua conta
        </h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {/* Nome */}
          <div className="space-y-1">
            <Label htmlFor="username" className="text-white/90 font-semibold text-sm">
              Nome
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
              <Input
                id="username"
                type="text"
                value={apelido}
                onChange={(e) => setNome(e.target.value)}
                className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                placeholder="Digite seu nome"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-white/90 font-semibold text-sm">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                placeholder="Digite seu email"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <Label htmlFor="senha" className="text-white/90 font-semibold text-sm">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-white/90 font-semibold text-sm">
              Confirmar senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            className="w-full h-9 bg-accent text-primary font-bold text-sm rounded-md shadow-md hover:scale-[1.02] hover:shadow-accent/30 transition-all"
          >
            Criar conta
          </Button>

          {/* Link de login */}
          <p className="text-center text-white/80 text-xs mt-1">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

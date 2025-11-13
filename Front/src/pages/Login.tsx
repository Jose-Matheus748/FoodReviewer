import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoFoodReviewer from "@/assets/logo-foodreviewer.png";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const userData = await response.json();
        login({
          id: userData.id,
          apelido: userData.apelido,
          email: userData.email,
        });
        console.log("Login realizado com sucesso!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Erro ao fazer login: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      console.error("Erro de rede/conexão:", error);
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
          Bem-vindo de volta
        </h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
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
            <Label htmlFor="password" className="text-white/90 font-semibold text-sm">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 h-9 rounded-md transition-all text-sm"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            className="w-full h-9 bg-accent text-primary font-bold text-sm rounded-md shadow-md hover:scale-[1.02] hover:shadow-accent/30 transition-all"
          >
            Entrar
          </Button>

          {/* Link de cadastro */}
          <p className="text-center text-white/80 text-xs mt-2">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="text-accent font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

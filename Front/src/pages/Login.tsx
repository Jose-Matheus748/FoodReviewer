import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoFoodReviewer from "@/assets/logo-foodreviewer.png";
import { Mail, Lock } from "lucide-react";
import bgImage from "@/assets/form-bg.png";

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
          role: userData.role
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
  <div
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})`,}}>

    {/*Efeitos de luz suaves */}
    <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/3 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse" />
    </div>
    <div className="absolute bottom-0 right-0 w-[650px] h-[650px] translate-x-1/3 translate-y-1/3 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/25 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
    </div>

    {/*Card principal de login */}
    <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl border border-accent/30 p-6 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm">
      {/* Brilho interno*/}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="hover:opacity-80 hover:scale-105 transition-all mb-4">
          <img
            src={logoFoodReviewer}
            alt="FoodReviewer Logo"
            className="w-16 h-16 object-contain drop-shadow-lg"
          />
        </Link>

        {/* Título */}
        <h1 className="text-2xl font-bold text-white text-center mb-4 tracking-wide drop-shadow">
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
            className="w-full h-9 bg-accent text-primary font-bold text-sm rounded-md shadow-md hover:scale-[1.03] hover:shadow-accent/50 hover:bg-accent/90 transition-all cursor-pointer">
            Entrar
          </Button>

          {/* Link de cadastro */}
          <p className="text-center text-white/80 text-xs mt-2">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro"
              className="text-accent font-semibold hover:underline hover:text-accent/80 cursor-pointer transition-all">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  );
}

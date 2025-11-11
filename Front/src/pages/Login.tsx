import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom"; // useNavigate adicionado
import { useAuth } from '../context/AuthContext';
import logoFoodReviewer from "@/assets/logo-foodreviewer.png";

export default function Login() {
  const navigate = useNavigate(); // Uso do hook de navegação, pra poder navegar entre as telas
  const { login } = useAuth(); // Uso do hook de autenticação
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/usuarios/login", { // Novo endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Armazena o usuário no contexto
        login({
          id: userData.id,
          apelido: userData.apelido,
          email: userData.email,
        });
        console.log("Login realizado com sucesso!");
        //alert("Login realizado com sucesso!"); comentando o alert pra gente adicionar algo melhor dps
        navigate("/"); // Redireciona para a tela inicial
      } else {
        const errorData = await response.json();
        console.error("Falha no login:", errorData.message || response.statusText);
        alert("Erro ao fazer login: " + (errorData.message || response.statusText));
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

          {/* Titulo */}
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Login
          </h1>

          {/* Formulario de login */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="password" className="text-accent font-semibold text-base">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-primary/40 border-primary/30 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent h-12"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-primary font-bold h-12 text-base rounded-lg transition-all"
            >
              Entrar
            </Button>

            <div className="text-center mt-6">
              <p className="text-white/80 text-sm">
                Não tem uma conta?{" "}
                <Link 
                  to="/cadastro" 
                  className="text-accent font-semibold hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

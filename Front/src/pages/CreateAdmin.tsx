import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoFoodReviewer from "@/assets/logo-foodreviewer.png";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const CreateAdmin = () => {
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apelido,
          email,
          senha,
          role: "ADMIN", // sempre ADMIN
        }),
      });

      if (response.ok) {
        alert("Administrador criado com sucesso!");
        navigate("/"); // redirecione para onde quiser
      } else {
        const err = await response.json();
        alert("Erro ao cadastrar admin: " + (err.message || response.statusText));
      }
    } catch (error) {
      alert("Erro de rede. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] via-[#eaeaea] to-[#d8d8d8] overflow-hidden">

      {/* Pontilhado do background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(89, 37, 179, 0.81) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Efeitos de luz */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute bottom-0 right-0 w-[650px] h-[650px] translate-x-1/3 translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/25 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl border border-accent/30 p-6 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm">

        {/* Brilho interno */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl pointer-events-none" />

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
            Criar Administrador
          </h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="w-full space-y-3">

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
                  className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 h-9 rounded-md text-sm"
                  placeholder="Digite o email do admin"
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
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 h-9 rounded-md text-sm"
                  placeholder="Digite a senha"
                  required
                />
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="space-y-1">
              <Label htmlFor="confirmSenha" className="text-white/90 font-semibold text-sm">
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-accent/70 w-4 h-4" />
                <Input
                  id="confirmSenha"
                  type="password"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  className="pl-9 bg-white/15 border border-accent/40 text-white placeholder:text-white/60 h-9 rounded-md text-sm"
                  placeholder="Confirme a senha"
                  required
                />
              </div>
            </div>

            {/* Botão */}
            <Button
              type="submit"
              className="w-full h-9 bg-accent text-primary font-bold text-sm rounded-md shadow-md hover:scale-[1.03] hover:bg-accent/90 transition-all">
              Criar Administrador
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
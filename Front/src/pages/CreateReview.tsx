import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import logo from "@/assets/logo-foodreviewer.png";
import { useAuth } from "../context/AuthContext";
import bgImage from "@/assets/form-bg.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const CreateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { usuario } = useAuth();

  const handleStarClick = (starIndex: number) => {
    setRating(rating === starIndex ? 0 : starIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!id) {
      setError("ID do produto não encontrado.");
      setLoading(false);
      return;
    }

    try {
      const reviewData = {
        comentario: description || "",
        nota: rating * 2,
        usuarioId: usuario?.id,
      };

      const response = await fetch(`${API_BASE_URL}/reviews/produto/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar avaliação");
      }

      navigate(`/produto/${id}`);
    } catch (err) {
      setError("Não foi possível enviar a avaliação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})`,}}>

      {/* Efeitos de luz suaves */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute bottom-0 right-0 w-[650px] h-[650px] translate-x-1/3 translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/25 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Card principal compacto */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl border border-accent/30 p-6 flex flex-col items-center overflow-hidden backdrop-blur-sm">
        {/* Brilho interno */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl pointer-events-none" />

        {/* Conteúdo */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="hover:opacity-80 hover:scale-105 transition-all mb-4"
          >
            <img
              src={logo}
              alt="FoodReviewer Logo"
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
          </button>

          {/* Título */}
          <h1 className="text-2xl font-bold text-white text-center mb-6 tracking-wide drop-shadow">
            Adicione sua avaliação
          </h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Estrelas */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`${star} estrelas`}
                >
                  <Star
                    className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
                      star <= rating
                        ? "fill-accent text-accent"
                        : "fill-transparent text-accent/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Descrição */}
            <div className="space-y-1">
              <label
                htmlFor="descricao"
                className="text-white/90 font-semibold text-sm block"
              >
                Adicione uma descrição (opcional):
              </label>
              <Textarea
                id="descricao"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite uma descrição"
                className="min-h-[120px] bg-white/15 border border-accent/40 text-white placeholder:text-white/60 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-md transition-all resize-none px-3 py-2 text-sm"
              />
            </div>

            {/* Erro */}
            {error && (
              <p className="text-center text-red-400 font-semibold text-sm">{error}</p>
            )}

            {/* Botão */}
            <Button
              type="submit"
              disabled={loading || rating === 0}
              className="w-full h-9 bg-accent text-primary font-bold text-sm rounded-md shadow-md hover:scale-[1.03] hover:shadow-accent/50 hover:bg-accent/90 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Postar avaliação"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;

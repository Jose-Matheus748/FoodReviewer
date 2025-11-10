import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import logo from "@/assets/logo-foodreviewer.png";

// ✅ URL base do backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const CreateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id do produto
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função de clique nas estrelas
  const handleStarClick = (starIndex: number) => {
    setRating(rating === starIndex ? 0 : starIndex);
  };

  // ✅ Envio da avaliação para o backend
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
      // Corpo da requisição
      const reviewData = {
        comentario: description || "",
        nota: rating * 2, // pois backend usa int de 0 a 10
      };

      const response = await fetch(`${API_BASE_URL}/reviews/produto/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar avaliação");
      }

      // Volta à página do produto após sucesso
      navigate(`/produto/${id}`);
    } catch (err) {
      console.error("Erro ao postar avaliação:", err);
      setError("Não foi possível enviar a avaliação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl p-8 md:p-12 border border-primary/20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="FoodReviewer Logo"
              className="w-24 h-24 object-contain cursor-pointer"
            />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Estrelas */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-14 h-14 md:w-16 md:h-16 transition-colors ${
                    star <= rating
                      ? "fill-accent text-accent"
                      : "fill-transparent text-accent/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Campo de Descrição */}
          <div className="space-y-3">
            <label className="text-xl md:text-2xl font-semibold text-accent block">
              Adicione uma descrição (opcional):
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite uma descrição"
              className="min-h-[200px] bg-primary/50 border-2 border-accent/20 text-white placeholder:text-white/40 focus:border-accent resize-none text-base"
            />
          </div>

          {/* Erro */}
          {error && <p className="text-center text-red-400 font-medium">{error}</p>}

          {/* Botão de concluir */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={loading || rating === 0}
              className="px-12 py-6 text-xl md:text-2xl font-bold bg-transparent border-4 border-accent text-accent hover:bg-accent hover:text-primary rounded-full transition-all disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Postar avaliação"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;

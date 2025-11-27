import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import logo from "@/assets/logo-foodreviewer.png";
import { useAuth } from "../context/AuthContext";

const UpdateReview = () => {
  const navigate = useNavigate();
  const { id, reviewId } = useParams<{ id: string; reviewId: string }>();

  const { usuario } = useAuth();

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingReview, setLoadingReview] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id || !reviewId) {
      setError("ID do produto ou avaliação não encontrados.");
      setLoadingReview(false);
      return;
    }

    const fetchReview = async () => {
      try {
        const res = await fetch(`${API_URL}/api/reviews/${reviewId}`);
        if (!res.ok) throw new Error("Erro ao buscar avaliação");

        const data = await res.json();
        // Assume data tem a estrutura: { id, nota, comentario, usuarioId, usuarioNome, produtoId }

        if (data.usuarioId !== usuario?.id) {
          setError("Você não tem permissão para editar esta avaliação.");
          setLoadingReview(false);
          return;
        }

        setRating(data.nota / 2);
        setDescription(data.comentario || "");
      } catch (err) {
        setError("Não foi possível carregar a avaliação.");
      } finally {
        setLoadingReview(false);
      }
    };

    fetchReview();
  }, [id, reviewId, usuario, API_URL]);

  const handleStarClick = (starIndex: number) => {
    setRating(rating === starIndex ? 0 : starIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!id || !reviewId) {
      setError("ID do produto ou avaliação não encontrados.");
      setLoading(false);
      return;
    }

    try {
      const updatedReview = {
        comentario: description || "",
        nota: rating * 2,
        usuarioId: usuario?.id,
      };

      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReview),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar avaliação");
      }

      navigate(`/produto/${id}`);
    } catch (err) {
      setError("Não foi possível atualizar a avaliação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingReview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] via-[#eaeaea] to-[#d8d8d8] p-4">
        <p className="text-lg text-gray-700 font-semibold">Carregando avaliação...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] via-[#eaeaea] to-[#d8d8d8] p-4">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] via-[#eaeaea] to-[#d8d8d8] overflow-hidden p-4">
      {/* Pontos no background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(89, 37, 179, 0.81) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

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
            Atualize sua avaliação
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
                Atualize a descrição (opcional):
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
              {loading ? "Atualizando..." : "Atualizar avaliação"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
